import { Link } from "react-router-dom";
// 1. Importamos os dados do nosso "banco"
import { mockClients } from "../data/db";

export function ClientListPage() {
  return (
    <div className="space-y-6">
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

          {/* 2. Correção: Usamos Link diretamente com estilo de botão */}
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
            {/* 3. Mapeamos os dados do "banco" para criar as linhas da tabela */}
            {mockClients.map((client) => (
              <tr
                key={client.id}
                className="border-b border-zinc-700 hover:bg-zinc-700/50 transition-colors"
              >
                <td className="p-4">{client.name}</td>
                <td className="p-4 text-zinc-400">{client.email}</td>
                <td className="p-4 text-zinc-400">{client.phone}</td>

                <td className="p-4 text-right space-x-3">
                  {/* 3. Link de Editar dinâmico */}
                  <Link
                    to={`/clientes/editar/${client.id}`}
                    className="text-sm text-yellow-500 hover:text-yellow-400 font-medium"
                  >
                    Editar
                  </Link>
                  <button className="text-sm text-red-500 hover:text-red-400 font-medium">
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
