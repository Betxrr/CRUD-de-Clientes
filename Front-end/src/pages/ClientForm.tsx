import { Header } from '../components/Header';
// ... imports do useState, useNavigate ...

// Lembre de receber as props:
export function ClientForm({ user, onLogout }: any) {
  // ... lógica do form (state, submit) igual ao anterior ...

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header mostra o nome do usuário logado */}
      <Header userName={user.name} onLogout={onLogout} title="Novo Cadastro" />

      <div className="flex justify-center px-4">
        {/* ... Restante do Formulário ... */}
      </div>
    </div>
  );
}