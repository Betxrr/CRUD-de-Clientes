import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Leaf } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

export function ClientFormPage() {
  const navigate = useNavigate();
  
  // Estado local do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'Ativo'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // MOCK: Fingimos que salvamos no banco
    console.log("Cliente Salvo:", formData);
    alert("Cliente cadastrado com sucesso! (Simulação)");
    navigate('/clientes'); // Volta para a lista
  };

  const handleCancel = () => {
    navigate('/clientes');
  };

  return (
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
            <ThemeToggle />
          </div>

          {/* Barra de Título da Página e Ações */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            
            {/* Títulos da Página */}
            <div>
              <h2 className="text-xl font-semibold text-primary-foreground">
                Novo Cliente
              </h2>
              <p className="text-sm text-primary-foreground/70">
                Cadastre um novo cliente no sistema.
              </p>
            </div>

            {/* Botão Voltar */}
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="h-5 w-5" />
              Voltar
            </button>
          </div>
        </div>
      </header>

      {/* === CONTEÚDO === */}
      <main className="max-w-2xl mx-auto px-8 py-12">
        <div className="bg-card border border-border rounded-lg shadow p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nome Completo</label>
              <input 
                required
                type="text"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Digite o nome do cliente"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">E-mail</label>
              <input 
                required
                type="email"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="exemplo@email.com"
              />
            </div>

            {/* Telefone e Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Telefone</label>
                <input 
                  type="text"
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select 
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-3 pt-6">
              <button 
                type="submit" 
                className="flex-1 bg-accent hover:bg-accent-hover text-accent-foreground font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Salvar Cliente
              </button>
              <button 
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-muted hover:bg-muted/80 text-muted-foreground font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}