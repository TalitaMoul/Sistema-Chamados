"use client";
import { useEffect, useState } from "react";
import FormularioChamados from "./components/FormularioChamados";
import { supabase } from "./lib/supabase";

export default function Home() {
  const [tickets, setTickets] = useState<any[]>([]); // Estado para armazenar a lista de tickets, inicializado como um array vazio

  useEffect(() => {
    // Use o useEffect para buscar os tickets do banco de dados quando o componente for montado
    async function fetchTickets() {
      const { data } = await supabase.from("tickets").select("*"); // Faz uma consulta à tabela "tickets" no Supabase para obter todos os tickets
      if (data) setTickets(data); // Se os dados forem retornados com sucesso, atualiza o estado dos tickets com os dados obtidos do banco de dados
    }
    fetchTickets(); // Chama a função fetchTickets para iniciar a busca dos tickets quando o componente for montado
  }, []);

  function onSave(newTicket: {
    id: number;
    title: string;
    status: string;
    description?: string;
    category?: string;
  }) {
    // Função para adicionar um novo ticket ao estado
    setTickets([
      ...tickets, // Usa o operador spread para manter os tickets existentes no estado
      {
        id: String(newTicket.id), // Converte o ID para string para manter a consistência com os IDs dos tickets existentes
        title: newTicket.title, // Usa o título do novo ticket
        status: newTicket.status, // Usa o status do novo ticket
        description: newTicket.description ?? "", // Usa o operador de coalescência nula para garantir que a descrição seja uma string, mesmo que seja undefined
        category: newTicket.category ?? "", // Usa o operador de coalescência nula para garantir que a categoria seja uma string, mesmo que seja undefined
      },
    ]); // Atualiza o estado dos tickets adicionando o novo ticket ao array existente
  }

  async function updateStatus(id: number, newStatus: string) {
    // Função para atualizar o status de um ticket
    const { error } = await supabase
      .from("tickets") // Especifica a tabela "tickets" para a operação de atualização
      .update({ status: newStatus }) // Define o novo status para o ticket
      .eq("id", id); // Especifica a condição para identificar o ticket a ser atualizado, comparando o ID do ticket com o ID fornecido

    if (error) {
      alert("Erro ao atualizar status: " + error.message); // Exibe um alerta com a mensagem de erro retornada pelo Supabase, caso ocorra um erro durante a atualização
      return; // Encerra a função updateStatus para evitar que o código continue executando após um erro
    }
    setTickets(
      // Atualiza o estado dos tickets para refletir a mudança de status
      tickets.map((t) => (t.id === id ? { ...t, status: newStatus } : t)), // Usa o método map para iterar sobre os tickets existentes
      //  e atualizar o status do ticket que corresponde ao ID fornecido, mantendo os outros tickets inalterados
    );
  }

  return (
    <main>
      <h1>Chamados</h1>
      {tickets.map(
        (
          ticket, // Renderiza a lista de tickets usando o método map para iterar sobre o array de tickets
        ) => (
          <div className="border p-4 rounded-lg mb-2" key={ticket.id}>
            {/* A propriedade key é importante para ajudar o React a identificar quais itens foram alterados, adicionados ou removidos */}
            <h2>Título: {ticket.title}</h2> {/* Exibe o título do ticket */}
            <p>Status: {ticket.status}</p> {/* Exibe o status do ticket */}
            <p>Descrição: {ticket.description}</p>{" "}
            {/* Exibe a descrição do ticket */}
            <p>Categoria: {ticket.category}</p>{" "}
            {/* Exibe a categoria do ticket */}
            <select
              value={ticket.status}
              onChange={(e) => updateStatus(ticket.id, e.target.value)}
            >
              <option value="Aberto">Aberto</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Resolvido">Resolvido</option>
            </select>
          </div>
        ),
      )}
      <FormularioChamados onSave={onSave} />
      {/* Renderiza o componente FormularioChamados e passa a função onSave como prop
       para que o formulário possa adicionar novos tickets ao estado */}
    </main>
  );
}
