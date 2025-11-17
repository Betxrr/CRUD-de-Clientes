import { Link } from 'react-router-dom';

// src/pages/ClientListPage.tsx

// 1. Atualizamos os dados mockados (adicionando 'phone')
const mockClients = [
  { id: '1', name: 'Humberto Rodrigues', email: 'humberto@email.com', phone: '(47) 95001-5500' },
  { id: '2', name: 'Cliente Exemplo 2', email: 'cliente2@email.com', phone: '(11) 98888-7777' },
  { id: '3', name: 'Cliente Exemplo 3', email: 'cliente3@email.com', phone: '(21) 97777-6666' },
];

export function ClientListPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Lista de Clientes Cadastrados</h2>
        
        {/* 2. Adicionando a barra de pesquisa e botão (UI da Imagem 2) */}
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Pesquisar por nome, CPF..."
            // Estilização do input com Tailwind
            className="bg-zinc-700 border border-zinc-600  px-3 py-2 text-sm w-72"
          />
          <button className="bg-sky-500 text-white px-4 py-2  hover:bg-sky-600 text-sm font-medium">
           <Link to="/clientes/novo" className="text-white">
             +  Novo Cliente
            </Link>
          </button>
        </div>
      </div>

      {/* 3. Refatoração de <ul> para <table> */}
      {/* 'overflow-x-auto' garante responsividade em tabelas */}
      <div className="overflow-x-auto  shadow-md">
        <table className="w-full text-left bg-zinc-800">
          
          {/* Cabeçalho da Tabela */}
          <thead className="bg-zinc-700 text-sm uppercase">
            <tr>
              <th className="p-4 font-medium text-center">Nome</th>
              <th className="p-4 font-medium text-center">Email</th>
              <th className="p-4 font-medium text-center">Telefone</th>
              <th className="p-4 font-medium text-center pl-10">Ações</th>
            </tr>
          </thead>
          
          {/* Corpo da Tabela */}
          <tbody>
            {mockClients.map((client) => (
              <tr 
                key={client.id} 
                className="border-b border-zinc-700 hover:bg-zinc-700/50"
              >
                <td className="p-4">{client.name}</td>
                <td className="p-4 text-zinc-400">{client.email}</td>
                <td className="p-4 text-zinc-400">{client.phone}</td>
                
                {/* Botões de Ação */}
                <td className="p-4 text-right space-x-3">
                  <button className="text-sm text-yellow-500 hover:text-yellow-400">
                    Editar
                  </button>
                  <button className="text-sm text-red-500 hover:text-red-400">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}