import { Link } from "react-router-dom";
import { useState } from "react";
import { mockClients, deleteClient } from "../data/db";
// Importamos os ícones
import { Pencil, Trash2, Leaf, Search, Plus } from "lucide-react";
// Importamos o botão de troca de tema (Certifique-se de ter criado ele em components/ThemeToggle.tsx)
import { ThemeToggle } from "../components/ThemeToggle";
export function ClientListPage() {
  const [clients, setClients] = useState(mockClients);

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      const deleted = deleteClient(id);
      if (deleted) {
        setClients((currentClients) =>
          currentClients.filter((client) => client.id !== id)
        );
      }
    }
  };

  return (
    // Fundo da página: Branco no claro, Zinco muito escuro no dark
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans text-gray-800 dark:text-zinc-100 -m-8 transition-colors duration-300">
      
      {/* === CABEÇALHO === */}
      {/* Verde claro no dia, Zinco escuro na noite. Borda verde forte sempre. */}
      <header className="bg-erp-green-light dark:bg-zinc-900 border-b-2 border-erp-green-DEFAULT dark:border-erp-green-dark px-8 py-6 shadow-sm transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          
          {/* Topo: Logo, Título e Botão de Tema */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {/* Box do Ícone */}
              <div className="bg-erp-green-DEFAULT dark:bg-erp-green-dark p-2 rounded-sm transition-colors">
                 <Leaf className="text-white h-6 w-6" />
              </div>
              {/* Título do Sistema */}
              <h1 className="text-2xl font-bold text-erp-green-DEFAULT dark:text-green-400 tracking-tight uppercase">
                Sistema ERP
              </h1>
            </div>

            {/* Componente Toggle de Dark Mode */}
            <ThemeToggle />
          </div>

          {/* Barra de Título da Página e Ações */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-zinc-200">
                Gestão de Clientes
              </h2>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                Consulte e gerencie os registros do sistema.
              </p>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              {/* Input de Pesquisa "Quadrado" (rounded-none) */}
              <div className="relative flex-1 md:w-72">
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="w-full bg-white dark:bg-zinc-800 border border-erp-gray-border dark:border-erp-gray-darkBorder rounded-none pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-erp-green-DEFAULT text-gray-800 dark:text-zinc-100 placeholder-gray-400 transition-colors"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              {/* Botão Novo "Quadrado" */}
              <Link
                to="/clientes/novo"
                className="bg-erp-green-DEFAULT dark:bg-erp-green-dark text-white px-4 py-2 rounded-none hover:bg-green-700 dark:hover:bg-green-800 text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors uppercase tracking-wider"
              >
                <Plus className="h-4 w-4" /> Novo
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* === ÁREA DE CONTEÚDO === */}
      <main className="max-w-6xl mx-auto p-8">
        
        {/* Tabela estilo "Grade Rígida" (Excel-like) */}
        <div className="overflow-x-auto border border-erp-gray-border dark:border-erp-gray-darkBorder shadow-sm">
          <table className="w-full text-left border-collapse text-sm">
            
            {/* Cabeçalho da Tabela */}
            <thead className="bg-erp-gray-header dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3 border border-erp-gray-border dark:border-erp-gray-darkBorder">Nome</th>
                <th className="p-3 border border-erp-gray-border dark:border-erp-gray-darkBorder">Email</th>
                <th className="p-3 border border-erp-gray-border dark:border-erp-gray-darkBorder text-center">Telefone</th>
                <th className="p-3 border border-erp-gray-border dark:border-erp-gray-darkBorder text-center w-24">Ações</th>
              </tr>
            </thead>
            
            {/* Corpo da Tabela */}
            <tbody className="bg-white dark:bg-zinc-900 divide-y divide-erp-gray-border dark:divide-erp-gray-darkBorder">
              {clients.map((client, index) => (
                <tr
                  key={client.id}
                  // LÓGICA ZEBRADA + DARK MODE
                  // Par: Branco (ou Zinco 900 no dark)
                  // Ímpar: Verde muito claro (ou Zinco 800 no dark)
                  className={`
                    border-b border-erp-gray-border dark:border-erp-gray-darkBorder transition-colors hover:bg-yellow-50 dark:hover:bg-zinc-800
                    ${index % 2 === 0 
                      ? 'bg-white dark:bg-zinc-900' 
                      : 'bg-erp-green-light/30 dark:bg-zinc-800/50'}
                  `}
                >
                  <td className="p-3 border border-erp-gray-border dark:border-erp-gray-darkBorder text-gray-800 dark:text-zinc-200 font-medium">
                    {client.name}
                  </td>
                  <td className="p-3 border border-erp-gray-border dark:border-erp-gray-darkBorder text-gray-600 dark:text-zinc-400">
                    {client.email}
                  </td>
                  <td className="p-3 border border-erp-gray-border dark:border-erp-gray-darkBorder text-center text-gray-600 dark:text-zinc-400">
                    {client.phone}
                  </td>

                  <td className="p-3 border border-erp-gray-border dark:border-erp-gray-darkBorder text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/clientes/editar/${client.id}`}
                        className="text-blue-700 dark:text-blue-400 hover:text-blue-900 p-1 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-sm transition-colors"
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="text-red-700 dark:text-red-400 hover:text-red-900 p-1 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-sm transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {clients.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500 dark:text-zinc-500 border border-erp-gray-border dark:border-erp-gray-darkBorder">
                    Nenhum registro encontrado no sistema.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">Total de registros: {clients.length}</p>
      </main>
    </div>
  );
}