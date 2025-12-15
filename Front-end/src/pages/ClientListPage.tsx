import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Leaf, Search } from "lucide-react";
import { mockClients, deleteClient } from "../data/db"; // Assumindo db.ts existe
import { ThemeToggle } from "../components/ThemeToggle"; // Reutilizando seu ThemeToggle

// ⚠️ Usaremos o componente ClientTable separado (conforme você forneceu)
// por ser grande e já estilizado, mas a lógica do Header/Search é integrada.
import { ClientTable } from "../components/ClientTable"; 

export function ClientListPage() {
  const navigate = useNavigate();
  const [clients, setClients] = useState(mockClients);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. LÓGICA: Função de edição
  const handleEdit = (id: string) => {
    navigate(`/clientes/editar/${id}`);
  };

  // 2. LÓGICA: Função de manipulação de dados de exclusão
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

  // 3. LÓGICA: Lógica de Filtragem (Front-End Primeiro)
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    // Usa classes semânticas: bg-background (branco/cinza claro) e text-foreground (preto/cinza escuro)
    <div className="min-h-screen bg-background text-foreground antialiased">
      
      {/* === CABEÇALHO INTEGRADO (Baseado no Lovable Header.tsx) === */}
      <header className="bg-primary border-b-4 border-primary-dark px-8 py-6 shadow-md transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          
          {/* Topo: Logo, Título do Sistema e Botão de Tema */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {/* Box do Ícone */}
              <div className="bg-primary-dark p-2 transition-colors">
                <Leaf className="text-primary-foreground h-6 w-6" />
              </div>
              {/* Título do Sistema */}
              <h1 className="text-2xl font-bold text-primary-foreground tracking-tight uppercase">
                CRUD de Clientes
              </h1>
            </div>
            <ThemeToggle />
          </div>

          {/* Barra de Título da Página e Ações */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            
            {/* Títulos da Página */}
            <div>
              <h2 className="text-xl font-semibold text-primary-foreground">
                Gestão de Clientes
              </h2>
              <p className="text-sm text-primary-foreground/70">
                Consulte e gerencie os registros do sistema.
              </p>
            </div>

            {/* Ações: Busca e Botão Novo */}
            <div className="flex gap-2 w-full md:w-auto">
              {/* Campo de Busca Integrado */}
              <div className="relative flex-1 md:w-72">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquisar cliente..."
                  // 💡 Usando a classe utilitária do Lovable
                  className="input-search pl-10 pr-3" 
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>

              {/* Botão Novo (Laranja - Accent) */}
              <Link
                to="/clientes/novo"
                // 💡 Usando a classe utilitária do Lovable para o Botão Laranja
                className="btn-accent" 
              >
                <Plus className="h-4 w-4" /> Novo
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* === ÁREA DE CONTEÚDO (Tabela) === */}
      <main className="max-w-6xl mx-auto px-8 py-8">
        
        {/* Renderiza a Tabela Estilizada */}
        <ClientTable 
          clients={filteredClients} 
          onEdit={handleEdit}
          onDelete={handleDelete} 
        />

        <p className="text-xs text-muted-foreground mt-4 px-1">
          Total de registros: {filteredClients.length}
        </p>
      </main>
    </div>
  );
}