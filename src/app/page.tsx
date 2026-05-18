"use client";
import { useState } from "react";
import FormularioChamados from "./components/FormularioChamados";

const ticketsData = [
  {
    id: "1",
    title: "Impressora Quebrada",
    status: "Aberto",
    description: "A impressora não está imprimindo",
    category: "Hardware",
  },
  {
    id: "2",
    title: "Computador Lento",
    status: "Em Progresso",
    description: "O computador está lento ao abrir programas",
    category: "Hardware",
  },
  {
    id: "3",
    title: "Software Não Funciona",
    status: "Fechado ",
    description: "O software não está abrindo",
    category: "Software",
  },
  {
    id: "4",
    title: "Problema de Rede",
    status: "Aberto",
    description: "Não é possível conectar à internet",
    category: "Rede",
  },
  {
    id: "5",
    title: "Erro de Login",
    status: "Em Progresso",
    description: "Não é possível fazer login no sistema",
    category: "Software",
  },
];

export default function Home() {
  const [tickets, setTickets] = useState(ticketsData); // Estado para armazenar os tickets

  function onSave(newTicket: {
    id: number;
    titulo: string;
    status: string;
    description?: string;
    category?: string;
  }) {
    // Função para adicionar um novo ticket ao estado
    setTickets([
      ...tickets, // Usa o operador spread para manter os tickets existentes no estado
      {
        id: String(newTicket.id), // Converte o ID para string para manter a consistência com os IDs dos tickets existentes
        title: newTicket.titulo, // Usa o título do novo ticket
        status: newTicket.status, // Usa o status do novo ticket
        description: newTicket.description ?? "", // Usa o operador de coalescência nula para garantir que a descrição seja uma string, mesmo que seja undefined
        category: newTicket.category ?? "", // Usa o operador de coalescência nula para garantir que a categoria seja uma string, mesmo que seja undefined
      },
    ]); // Atualiza o estado dos tickets adicionando o novo ticket ao array existente
  }

  return (
    <main>
      <h1>Chamados</h1>
      {tickets.map(
        (
          ticket, // Renderiza a lista de tickets usando o método map para iterar sobre o array de tickets
        ) => (
          <div key={ticket.id}>
            {/* A propriedade key é importante para ajudar o React a identificar quais itens foram alterados, adicionados ou removidos */}
            <h2>Título: {ticket.title}</h2> {/* Exibe o título do ticket */}
            <p>Status: {ticket.status}</p> {/* Exibe o status do ticket */}
            <p>Descrição: {ticket.description}</p>{" "}
            {/* Exibe a descrição do ticket */}
            <p>Categoria: {ticket.category}</p>{" "}
            {/* Exibe a categoria do ticket */}
          </div>
        ),
      )}
      <FormularioChamados onSave={onSave} />
      {/* Renderiza o componente FormularioChamados e passa a função onSave como prop
       para que o formulário possa adicionar novos tickets ao estado */}
    </main>
  );
}
