import { Link } from "react-router-dom";
import { useState } from "react"; // 1. Importamos o useState
import { mockClients, deleteClient } from "../data/db"; // 2. Importamos o delete

export function ClientListPage() {
  // 3. Transformamos os dados em ESTADO.
  // Isso diz ao React: "Se 'clients' mudar, redesenhe a tabela".
  // A tipagem <Client[]> é inferida automaticamente do mockClients, 
  // mas poderíamos forçar: useState<Client[]>(mockClients)
  const [clients, setClients] = useState(mockClients);

  // 4. Função para lidar com o clique no botão Excluir
  const handleDelete = (id: string) => {
    // Boa prática: Perguntar antes de deletar
    const confirm = window.confirm("Tem certeza que deseja excluir este cliente?");
    
    if (confirm) {
      // 1. Remove do "Banco"
      deleteClient(id);
      
      // 2. Atualiza a TELA (O Estado)
      // Filtramos a lista atual para remover o item com aquele ID
      setClients(clients.filter(client => client.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* ... (Cabeçalho e Input de pesquisa permanecem iguais) ... */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          Lista de Clientes Cadastrados
        </h2>

        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Pesquisar por nome, CPF..."
            className="bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-sm w-72 text-zinc-100 placeholder-zinc-400"
          />

          <Link
            to="/clientes/novo"
            className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 text-sm font-medium flex items-center"
          >
            + Novo Cliente
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto shadow-md">
        <table className="w-full text-left bg-zinc-800">
          <thead className="bg-zinc-700 text-sm uppercase text-zinc-200">
            <tr>
              <th className="p-4 font-medium text-center">Nome</th>
              <th className="p-4 font-medium text-center">Email</th>
              <th className="p-4 font-medium text-center">Telefone</th>
              <th className="p-4 font-medium text-center pl-10">Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* 5. Renderizamos a variável de estado 'clients', não mais o 'mockClients' direto */}
            {clients.map((client) => (
              <tr
                key={client.id}
                className="border-b border-zinc-700 hover:bg-zinc-700/50 transition-colors"
              >
                <td className="p-4">{client.name}</td>
                <td className="p-4 text-zinc-400">{client.email}</td>
                <td className="p-4 text-zinc-400">{client.phone}</td>

                <td className="p-4 text-right space-x-3">
                  <Link
                    to={`/clientes/editar/${client.id}`}
                    className="text-sm text-yellow-500 hover:text-yellow-400 font-medium"
                  >
                    Editar
                  </Link>
                  
                  {/* 6. Botão Excluir chamando nossa função */}
                  <button 
                    onClick={() => handleDelete(client.id)}
                    className="text-sm text-red-500 hover:text-red-400 font-medium"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            
            {/* Feedback visual caso a lista esteja vazia */}
            {clients.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-zinc-500">
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}