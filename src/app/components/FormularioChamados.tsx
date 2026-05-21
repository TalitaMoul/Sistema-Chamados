import { useRef, useEffect } from "react";
import { supabase } from "../lib/supabase";

interface FormularioChamadosProps {
  // Define a interface para as props do componente FormularioChamados
  onSave: (ticket: {
    // Define a função onSave que será passada como prop para o componente FormularioChamados, que recebe um objeto ticket com as seguintes propriedades:
    id: number;
    title: string;
    status: string;
    description?: string;
    category?: string;
  }) => void; // A função onSave é do tipo void, ou seja, não retorna nenhum valor. Ela é usada para adicionar um novo ticket ao estado do componente pai (Home) quando um novo chamado é criado no formulário.
}

export default function FormularioChamados({
  onSave,
}: FormularioChamadosProps) {
  const tituloRef = useRef<HTMLInputElement>(null); // Cria uma referência para o campo de título

  useEffect(() => {
    // Use o useEffect para focar no campo de título quando o componente for montado
    if (tituloRef.current) {
      // Verifica se a referência foi atribuída corretamente
      tituloRef.current.focus(); // Foca no campo de título
    }
  }, []); // O array vazio [] garante que o efeito seja executado apenas uma vez, quando o componente for montado

  async function handleSubmit() {
    const title = tituloRef.current?.value; // Obtém o valor do campo de título usando a referência
    if (!title) {
      alert("Por favor, insira um título para o chamado.");
      return;
    }
    const description = document.querySelector<HTMLInputElement>(
      'input[placeholder="Descrição"]',
    )?.value; // Obtém o valor do campo de descrição usando querySelector
    const category = document.querySelector<HTMLSelectElement>( // Obtém o valor do campo de categoria usando querySelector
      'select[name="category"]', // Seleciona o elemento select com o nome "category"
    )?.value; // Obtém o valor do campo de categoria usando querySelector
    const { data, error } = await supabase // Usa o cliente Supabase para inserir um novo chamado na tabela "chamados"
      .from("tickets") // Especifica a tabela "tickets" para a operação de inserção
      .insert([{ title, description, category, status: "Aberto" }]) // Insere um novo registro com os valores de título, descrição, categoria e um status padrão de "Aberto"
      .select(); // Usa o método select() para retornar os dados do registro inserido, o que é útil para obter o ID gerado automaticamente pelo banco de dados

    if (error) {
      // Verifica se ocorreu um erro durante a inserção
      alert("Erro ao salvar: " + error.message); // Exibe um alerta com a mensagem de erro retornada pelo Supabase
      return; // Encerra a função handleSubmit para evitar que o código continue executando após um erro
    }

    if (data) {
      onSave(data[0]);
      alert("Chamado salvo: " + title);
    }
  }

  return (
    <div>
      <input type="text" placeholder="Título" ref={tituloRef} />{" "}
      {/* Campo de título com a referência para focar automaticamente */}
      <input type="text" placeholder="Descrição" />
      <select name="category" id="category">
        <option value="Hardware">Hardware</option>
        <option value="Software">Software</option>
        <option value="Rede">Rede</option>
      </select>
      <button onClick={handleSubmit}>Salvar</button>{" "}
      {/* Botão para salvar o chamado, que chama a função handleSubmit quando clicado */}~
    </div>
  );
}
