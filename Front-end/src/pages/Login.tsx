import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { USERS_MOCK } from '../mocks/dataMock';

interface User {
  id: number;
  name: string;
  email: string;
}

interface LoginProps {
  onLogin: (user: User) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const foundUser = USERS_MOCK.find(u => u.email === email && u.password === password);

    if (foundUser) {
      onLogin(foundUser as User);
      navigate('/dashboard');
    } else {
      setError('E-mail ou senha inválidos.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 font-sans">
      
      {/* CARD PRINCIPAL: Estilo "Bloco Sólido" */}
      <div className="w-full max-w-sm bg-white border border-gray-400 shadow-sm p-8 rounded-none">
        
        {/* CABEÇALHO */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            {/* Ícone de Folha - Mesmo verde do CRUD de Clientes */}
            {/* <div className="bg-white p-2">
              <Leaf className="w-6 h-6 text-emerald-700" />
            </div> */}
            
            {/* Título Principal */}
            <h1 className="text-3xl font-extrabold text-emerald-700 uppercase tracking-tight">
              CRUD de Clientes
            </h1>
          </div>
          
          <div className="border-b-2 border-gray-200 pb-2">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              Acesso ao Sistema
            </span>
          </div>
        </div>

        {/* BOX DE DEMONSTRAÇÃO (Estilo Terminal) */}
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-600 rounded-none flex flex-col items-center">
          <p className="text-xs font-bold text-emerald-800 uppercase mb-2 border-b border-emerald-200 w-full text-center pb-1">
            Ambiente de Teste
          </p>
          
          {/* Container alinhado à ESQUERDA (text-left) mas centralizado no bloco (inline-block) */}
          <div className="font-mono text-sm text-emerald-900 space-y-1 w-full text-left pl-4">
            <p>USER: <span className="font-bold">demo@empresa.com</span></p>
            <p>PASS: <span className="font-bold">123</span></p>
          </div>
        </div>

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1 ml-1">Usuário / E-mail</label>
            <input 
              type="email" 
              className="w-full px-3 py-3 border-2 border-gray-300 rounded-none bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1 ml-1">Senha de Acesso</label>
            <input 
              type="password" 
              className="w-full px-3 py-3 border-2 border-gray-300 rounded-none bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-2 bg-red-100 border border-red-400 text-red-700 text-xs font-bold text-center rounded-none">
              ⚠️ {error}
            </div>
          )}

          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 uppercase tracking-wider rounded-none shadow-sm transition-colors border-b-4 border-orange-800 active:border-b-0 active:mt-1"
            >
              Entrar no Sistema
            </button>
          </div>
        </form>

        <div className="mt-8 text-center border-t border-gray-200 pt-4">
          <p className="text-sm">
            Não é cadastrado?{' '}
            <button
              onClick={() => navigate('/clientes/novo')}
              className="text-orange-600 font-semibold hover:underline"
            >
              Cadastre-se!
            </button>
          </p>

          <p className="text-[10px] text-gray-400 uppercase mt-3">Criado por Humberto Rodrigues V1.0</p>
        </div>
      </div>
    </div>
  );
}