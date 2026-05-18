import { useRef, useEffect } from "react";

interface FormularioChamadosProps {
  onSave: (ticket: {
    id: number;
    titulo: string;
    status: string;
    description?: string;
    category?: string;
  }) => void;
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

  function handleSubmit() {
    const titulo = tituloRef.current?.value; // Obtém o valor do campo de título usando a referência
    if (!titulo) {
      alert("Por favor, insira um título para o chamado.");
      return;
    }
    const description = document.querySelector<HTMLInputElement>(
      'input[placeholder="Descrição"]',
    )?.value; // Obtém o valor do campo de descrição usando querySelector
    const category = document.querySelector<HTMLSelectElement>( // Obtém o valor do campo de categoria usando querySelector
      'select[name="category"]', // Seleciona o elemento select com o nome "category"
    )?.value; // Obtém o valor do campo de categoria usando querySelector
    onSave({
      id: Date.now(),
      titulo,
      status: "Aberto",
      description,
      category: category
    }); // Chama a função onSave passando um objeto com o título e um status padrão
    alert("Chamado salvo: " + titulo); // Exibe um alerta com o título do chamado salvo
  }

  return (
    <div>
      <input type="text" placeholder="Título" ref={tituloRef} /> {/* Campo de título com a referência para focar automaticamente */}
      <input type="text" placeholder="Descrição" />
      <select name="category" id="category">
        <option value="Hardware">Hardware</option>
        <option value="Software">Software</option>
        <option value="Rede">Rede</option>
      </select>
      <button onClick={handleSubmit}>Salvar</button> {/* Botão para salvar o chamado, que chama a função handleSubmit quando clicado */}
    </div>
  );
}
