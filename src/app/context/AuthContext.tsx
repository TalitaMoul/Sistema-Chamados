"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext<any>(null); // Cria um contexto de autenticação usando createContext do React,
//  inicializado com null. O tipo any é usado para permitir que o contexto armazene qualquer tipo de valor,
//  mas idealmente deveria ser tipado de forma mais específica para refletir a estrutura dos dados de autenticação.

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Componente AuthProvider que recebe os filhos
  // como props e é responsável por fornecer o contexto de autenticação para os componentes filhos
  const [session, setSession] = useState<any>(null); // Estado para armazenar a sessão de autenticação do usuário,
  //  inicializado como null. O tipo any é usado para permitir que o estado armazene qualquer tipo de valor,
  //  mas idealmente deveria ser tipado de forma mais específica para refletir a estrutura dos dados de sessão.

  useEffect(() => {
    // Use o useEffect para configurar um listener de autenticação do Supabase quando o componente for montado
    supabase.auth.getSession().then(({ data }) => {
      // Usa o método getSession do cliente Supabase para obter a sessão de autenticação atual do usuário
      setSession(data.session); // Atualiza o estado da sessão com os dados retornados pelo Supabase, permitindo que os componentes filhos acessem
      //  as informações de autenticação do usuário
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // Configura um listener para mudanças no estado de autenticação
        //  usando o método onAuthStateChange do cliente Supabase
        setSession(session); // Atualiza o estado da sessão sempre que ocorrer uma mudança no estado de autenticação,
        //  garantindo que os componentes filhos tenham acesso às informações de autenticação atualizadas do usuário
      },
    );

    return () => listener.subscription.unsubscribe(); // Retorna uma função de limpeza que cancela a inscrição do listener
    //  quando o componente for desmontado, evitando vazamentos de memória
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>
      {" "}
      {/* Fornece o valor da sessão de autenticação para os componentes filhos através do contexto */}
      {children}{" "}
      {/* Renderiza os componentes filhos dentro do provedor de contexto, permitindo que eles acessem o valor da sessão de autenticação */}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext); // Função personalizada para acessar o contexto de autenticação,
  //  permitindo que os componentes filhos acessem facilmente as informações de autenticação do usuário
}
