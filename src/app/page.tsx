"use client";
import { useState } from "react";
import FormularioChamado from "./components/FormularioChamados"
import FormularioChamados from "./components/FormularioChamados";

const ticketsData = [
  { id: "1", title: "Impressora Quebrada", status: "Aberto" },
  { id: "2", title: "Computador Lento", status: "Em Progresso" },
  { id: "3", title: "Software Não Funciona", status: "Fechado " },
  { id: "4", title: "Problema de Rede", status: "Aberto" },
  { id: "5", title: "Erro de Login", status: "Em Progresso" },
];

export default function Home() {
  const [tickets] = useState(ticketsData);
  return (
    <main>
      <h1> 
        Chamados
      </h1>
      {tickets.map((ticket) => (
        <div key={ticket.id}>
          <h2>{ticket.title}</h2>
          <p>Status: {ticket.status}</p>
        </div>
      ))}
      <FormularioChamados />
    </main>
  );
}
