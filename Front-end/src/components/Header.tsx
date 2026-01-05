import { LogOut } from 'lucide-react';

interface HeaderProps {
  userName: string;
  onLogout: () => void;
  title?: string;
}

export function Header({ userName, onLogout, title = "Sistema" }: HeaderProps) {

  return (
    <header className="bg-white shadow-sm mb-6">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Título da Página Atual */}
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        
        <div className="flex items-center gap-4">
          {/* Mensagem de Boas Vindas */}
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-500">Bem-vindo,</p>
            <p className="text-sm font-bold text-gray-700">{userName}</p>
          </div>

          {/* Botão de Logout em branco com ícone */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-border py-2 px-3 rounded"
            title="Sair do sistema"
          >
            <LogOut className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
}