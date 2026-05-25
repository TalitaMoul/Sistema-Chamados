"use client";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState(""); // Estado para armazenar o email do usuário, inicializado como uma string vazia
  const [password, setPassword] = useState(""); // Estado para armazenar a senha do usuário, inicializado como uma string vazia

  async function signInWithPassword() {
    // Função para fazer login usando email e senha com o Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    }); // Chama o método signInWithPassword do cliente Supabase
    //  para tentar autenticar o usuário com o email e senha fornecidos. O resultado é desestruturado para obter o objeto de erro,
    //  caso ocorra algum problema durante o processo de login.
    if (error) {
      // Verifica se ocorreu um erro durante o processo de login
      alert("Erro ao fazer login: " + error.message); // Exibe um alerta com a mensagem de erro retornada pelo Supabase, caso o login falhe
    } else {
      alert("Login bem-sucedido!"); // Exibe um alerta indicando que o login foi bem-sucedido, caso não haja erros durante o processo de autenticação
      router.replace("/"); // Redireciona o usuário para a página inicial ("/") usando o hook useRouter do Next.js, caso o login seja bem-sucedido
    }
  }
  async function signUp() {
    // Função para cadastrar um novo usuário usando email e senha com o Supabase
    const { error } = await supabase.auth.signUp({ email, password }); // Chama o método signUp do cliente Supabase para
    //  tentar criar uma nova conta de usuário com o email e senha fornecidos. O resultado é desestruturado para obter o objeto de erro,
    //  caso ocorra algum problema durante o processo de cadastro.
    if (error) {
      // Verifica se ocorreu um erro durante o processo de cadastro
      alert("Erro ao cadastrar: " + error.message); // Exibe um alerta com a mensagem de erro retornada pelo Supabase, caso o cadastro falhe
    } else {
      alert(
        "Cadastro bem-sucedido! Verifique seu email para confirmar a conta.",
      ); // Exibe um alerta indicando que o cadastro foi bem-sucedido
      //  e orienta o usuário a verificar seu email para confirmar a conta, caso não haja erros durante o processo de criação de conta.
    }
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        {/* Campo de entrada para o email do usuário, com um placeholder
        "Email". O valor do campo é vinculado ao estado "email" e é atualizado sempre que o usuário digita algo no campo, usando a função setEmail. */}
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        {/* Campo de entrada para a senha do usuário,
        com um placeholder "Senha". O valor do campo é vinculado ao estado "password"
        e é atualizado sempre que o usuário digita algo no campo, usando a função setPassword. */}
      </div>
      <div>
        <button onClick={signInWithPassword}>Fazer Login</button>{" "}
        {/* Botão para acionar a função de login, que tenta autenticar o usuário com o email e senha fornecidos. */}
        <button onClick={signUp}>Cadastre-se</button>{" "}
        {/* Botão para acionar a função de cadastro, que tenta criar uma nova conta de usuário com o email e senha fornecidos. */}
      </div>
    </div>
  );
}
