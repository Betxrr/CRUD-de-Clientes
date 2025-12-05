import { Link } from "react-router-dom";
import { useState } from "react";
import { mockClients, deleteClient } from "../data/db";
// 1. Importamos os novos ícones
import { Pencil, Trash2, Leaf, Search, Plus } from "lucide-react";

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

  // REMOVEMOS o padding padrão do container principal para o header encostar nas bordas
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 -m-8">
      
      {/* === CABEÇALHO VERDE SUAVE (Estilo ERP) === */}
      <header className="bg-erp-green-light border-b-2 border-erp-green-DEFAULT px-8 py-6 shadow-sm">
        <div className="max-w-6xl mx-auto">
          
          {/* Área da Logo e Título do Sistema */}
          <div className="flex items-center gap-3 mb-8">
            {/* PLACEHOLDER DA SUA IMAGEM: Substitua este bloco pela sua tag <img> */}
            {/* Para inverter (branco sobre verde), podemos usar um container verde escuro */}
            <div className="bg-erp-green-DEFAULT p-2 rounded-sm">
               <Leaf className="text-white h-6 w-6" />
            </div>
            {/* ----------------------------------------------------------------------- */}
            <h1 className="text-2xl font-bold text-erp-green-DEFAULT tracking-tight uppercase">
              Sistema ERP
            </h1>
          </div>

          {/* Barra de Título da Página e Ações */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                Gestão de Clientes
              </h2>
              <p className="text-sm text-gray-500">Consulte e gerencie os registros do sistema.</p>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              {/* Input de Pesquisa "Quadrado" */}
              <div className="relative flex-1 md:w-72">
                <input
                  type="text"
                  placeholder="Pesquisar por nome, CPF..."
                  // 'rounded-none' tira as curvas. Bordas cinza claras.
                  className="w-full bg-white border border-erp-gray-border rounded-none pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-erp-green-DEFAULT transition-colors shadow-sm"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              {/* Botão Novo "Quadrado" */}
              <Link
                to="/clientes/novo"
                // 'rounded-none'. Cor verde corporativa forte.
                className="bg-erp-green-DEFAULT text-white px-4 py-2 rounded-none hover:bg-green-700 text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors uppercase tracking-wider"
              >
                <Plus className="h-4 w-4" /> Novo
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* === ÁREA DE CONTEÚDO BRANCA === */}
      <main className="max-w-6xl mx-auto p-8">
        
        {/* Tabela estilo "Grade Rígida" (Excel-like) */}
        {/* 'border-collapse' é essencial para as bordas das células se juntarem */}
        <div className="overflow-x-auto border border-erp-gray-border shadow-sm">
          <table className="w-full text-left border-collapse text-sm">
            
            {/* Cabeçalho da Tabela */}
            <thead className="bg-erp-gray-header text-gray-700 font-bold uppercase tracking-wider">
              <tr>
                {/* Adicionamos bordas (border) em CADA célula (th) */}
                <th className="p-3 border border-erp-gray-border">Nome</th>
                <th className="p-3 border border-erp-gray-border">Email</th>
                <th className="p-3 border border-erp-gray-border text-center">Telefone</th>
                <th className="p-3 border border-erp-gray-border text-center w-24">Ações</th>
              </tr>
            </thead>
            
            {/* Corpo da Tabela */}
            <tbody className="bg-white divide-y divide-erp-gray-border">
              {clients.map((client) => (
                <tr
                  key={client.id}
                  // Hover mais sutil, estilo sistema antigo
                  className="hover:bg-yellow-50 transition-colors"
                >
                  {/* Adicionamos bordas (border) em CADA célula (td) */}
                  <td className="p-3 border border-erp-gray-border text-gray-800 font-medium">{client.name}</td>
                  <td className="p-3 border border-erp-gray-border text-gray-600">{client.email}</td>
                  <td className="p-3 border border-erp-gray-border text-center text-gray-600">{client.phone}</td>

                  <td className="p-3 border border-erp-gray-border text-center">
                    <div className="flex items-center justify-center gap-2">
                      {/* Ícone de Editar (Azul corporativo) */}
                      <Link
                        to={`/clientes/editar/${client.id}`}
                        className="text-blue-700 hover:text-blue-900 p-1 hover:bg-blue-50 rounded-sm transition-colors"
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      
                      {/* Ícone de Excluir (Vermelho corporativo) */}
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="text-red-700 hover:text-red-900 p-1 hover:bg-red-50 rounded-sm transition-colors"
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
                  <td colSpan={4} className="p-8 text-center text-gray-500 border border-erp-gray-border">
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