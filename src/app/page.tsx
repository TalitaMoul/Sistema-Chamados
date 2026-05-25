"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormularioChamados from "./components/FormularioChamados";
import { supabase } from "./lib/supabase";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const { session } = useAuth();
  const router = useRouter();
  const [perfil, setPerfil] = useState<string | null>(null);
  const [tickets, setTickets] = useState<any[]>([]);

  // Proteção de rota
  useEffect(() => {
    if (session === null) router.replace("/login");
  }, [session]);

  // Busca o perfil do usuário logado
  useEffect(() => {
    async function fetchPerfil() {
      if (!session) return;
      const { data } = await supabase
        .from("perfis")
        .select("perfil")
        .eq("id", session.user.id)
        .single();
      if (data) setPerfil(data.perfil);
    }
    fetchPerfil();
  }, [session]);

  // Busca chamados dependendo do perfil
  useEffect(() => {
    async function fetchChamados() {
      let query = supabase.from("chamados").select("*");
      if (perfil === "usuario") {
        query = query.eq("user_id", session!.user.id);
      }
      const { data } = await query;
      if (data) setTickets(data);
    }
    if (perfil) fetchChamados();
  }, [perfil]);

  function onSave(newTicket: any) {
    setTickets([...tickets, newTicket]);
  }

  async function atualizarStatus(id: string, newStatus: string) {
    const { error } = await supabase
      .from("chamados")
      .update({ status: newStatus })
      .eq("id", id);
    if (error) {
      alert("Erro: " + error.message);
      return;
    }
    setTickets(
      tickets.map((c) => (c.id === id ? { ...c, status: newStatus } : c)),
    );
  }

  return (
    <main>
      <h1>Chamados</h1>
      {tickets.map((ticket) => (
        <div className="border p-4 rounded-lg mb-2" key={ticket.id}>
          <h2>Título: {ticket.titulo}</h2>
          <p>Status: {ticket.status}</p>
          <p>Descrição: {ticket.description}</p>
          <p>Categoria: {ticket.category}</p>
          <select
            value={ticket.status}
            onChange={(e) => atualizarStatus(ticket.id, e.target.value)}
          >
            <option value="Aberto">Aberto</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Resolvido">Resolvido</option>
          </select>
        </div>
      ))}
      <FormularioChamados onSave={onSave} />
    </main>
  );
}
