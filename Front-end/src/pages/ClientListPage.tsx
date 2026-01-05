import { Link, useNavigate } from "react-router-dom";
import { Plus, Leaf, Search, LogOut } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import { ClientTable } from "../components/ClientTable"; 

// Importamos o Hook que acabamos de criar
import { useClientList } from "../hooks/useClientList";

interface ClientListPageProps {
  user: { id: number; name: string; email?: string };
  onLogout: () => void;
}

export function ClientListPage({ user, onLogout }: ClientListPageProps) {
  const navigate = useNavigate();

  // 1. CLEAN ARCHITECTURE: Toda a lógica complexa (estado, filtro, delete) vem daqui
  const { 
    filteredClients, 
    searchTerm, 
    setSearchTerm, 
    removeClient 
  } = useClientList();

  // Função simples de navegação (pode ficar aqui pois é puramente visual/rota)
  const handleEdit = (id: string) => {
    navigate(`/clientes/editar/${id}`);
  };

  return (
    // Estrutura visual mantida conforme design original
    <div className="min-h-screen bg-background text-foreground antialiased">
      
      {/* === CABEÇALHO INTEGRADO === */}
      <header className="bg-primary border-b-4 border-primary-dark px-8 py-6 shadow-md transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          
          {/* Topo: Logo, Título do Sistema e Botão de Tema */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary-dark p-2 transition-colors">
                <Leaf className="text-primary-foreground h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold text-primary-foreground tracking-tight uppercase">
                CRUD de Clientes
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-xs text-primary-foreground/70">Bem-vindo,</p>
                <p className="text-sm font-semibold text-primary-foreground">{user?.name}</p>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded"
                title="Sair"
              >
                <LogOut className="w-4 h-4 text-white" />
                <span className="text-sm font-medium">Sair</span>
              </button>
              <ThemeToggle />
            </div>
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
                  // O Hook controla o estado agora
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquisar cliente..."
                  className="input-search pl-10 pr-3" 
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>

              {/* Botão Novo */}
              <Link
                to="/clientes/novo"
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
          onDelete={removeClient} 
        />

        <p className="text-xs text-muted-foreground mt-4 px-1">
          Total de registros: {filteredClients.length}
        </p>
      </main>
    </div>
  );
}