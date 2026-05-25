import { AuthProvider } from "./context/AuthContext"; // Importa o componente AuthProvider do arquivo de
//  contexto de autenticação, que é responsável por fornecer o contexto de autenticação para os componentes filhos.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Componente RootLayout que recebe os filhos como props
  //  e é responsável por envolver a aplicação com o provedor de contexto de autenticação
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          {children}{" "}
          {/* Renderiza os componentes filhos dentro do provedor de contexto de autenticação,
           permitindo que eles acessem as informações de autenticação do usuário */}
        </AuthProvider>
      </body>
    </html>
  );
}
