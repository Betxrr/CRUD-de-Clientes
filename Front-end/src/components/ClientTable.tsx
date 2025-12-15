import { Edit, Trash2 } from 'lucide-react';
import type { Client } from '../data/db';

interface ClientTableProps {
  clients: Client[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ClientTable({ clients, onEdit, onDelete }: ClientTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-none border border-border">
      <table className="w-full">
        <thead>
          <tr className="bg-table-header border-b border-table-border">
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Nome</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Telefone</th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                Nenhum cliente cadastrado
              </td>
            </tr>
          ) : (
            clients.map((client, index) => (
              <tr
                key={client.id}
                className={`border-b border-table-border transition-colors ${
                  index % 2 === 0 ? 'bg-table-row' : 'bg-table-row-alt'
                } hover:bg-muted`}
              >
                <td className="px-6 py-4 text-sm text-foreground">{client.name}</td>
                <td className="px-6 py-4 text-sm text-foreground">{client.email}</td>
                <td className="px-6 py-4 text-sm text-foreground">{client.phone || '-'}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(client.id)}
                      className="btn-ghost p-2"
                      title="Editar"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(client.id)}
                      className="btn-ghost p-2 text-destructive hover:text-destructive"
                      title="Deletar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
