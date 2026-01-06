import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../data/db';

export function RegisterPage() {
  const navigate = useNavigate();
  
  // Aqui eu guardo os dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');

  // Função que roda quando eu clico em cadastrar
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não estão iguais.");
      return;
    }

    try {
      // Tento criar o usuário no meu banco local
      createUser(formData.name, formData.email, formData.password);
      alert("Conta criada! Agora é só entrar.");
      navigate('/'); // Mando de volta pro Login
    } catch (err: any) {
      setError(err.message || "Deu erro ao criar conta.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 font-sans">
      
      {/* Card principal com bordas retas (estilo antigo) */}
      <div className="w-full max-w-sm bg-white border border-gray-400 shadow-sm p-8 rounded-none">
        
        {/* Cabeçalho */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            {/* Ícone da folha */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-emerald-700">
              <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.352-.272-2.636-.759-3.807a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08l-.009-.008z" clipRule="evenodd" />
              <path d="M12 2.25a.75.75 0 01.75.75v8.99l2.72 2.72a.75.75 0 11-1.06 1.06l-3.25-3.25a.75.75 0 01-.22-.53V3a.75.75 0 01.75-.75z" />
            </svg>
            <h1 className="text-2xl font-extrabold text-emerald-700 uppercase tracking-tight">
              Novo Usuário
            </h1>
          </div>
          <div className="border-b-2 border-gray-200 pb-2">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              Cadastro de Acesso
            </span>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1 ml-1">Nome Completo</label>
            <input 
              required
              type="text" 
              className="w-full px-3 py-3 border-2 border-gray-300 rounded-none bg-gray-50 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1 ml-1">E-mail</label>
            <input 
              required
              type="email" 
              className="w-full px-3 py-3 border-2 border-gray-300 rounded-none bg-gray-50 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1 ml-1">Senha</label>
              <input 
                required
                type="password" 
                className="w-full px-3 py-3 border-2 border-gray-300 rounded-none bg-gray-50 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1 ml-1">Confirmar</label>
              <input 
                required
                type="password" 
                className="w-full px-3 py-3 border-2 border-gray-300 rounded-none bg-gray-50 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                value={formData.confirmPassword}
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          </div>

          {error && (
            <div className="p-2 bg-red-100 border border-red-400 text-red-700 text-xs font-bold text-center rounded-none">
              ⚠️ {error}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full mt-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 uppercase tracking-wider rounded-none shadow-sm transition-colors border-b-4 border-orange-800 active:border-b-0 active:mt-1"
          >
            Cadastrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-gray-500 hover:text-emerald-700 text-xs font-bold uppercase underline">
            Voltar para Login
          </Link>
        </div>
      </div>
    </div>
  );
}