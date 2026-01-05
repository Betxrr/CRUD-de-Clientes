// src/App.tsx
import './App.css';

// Importar componentes de Roteamento
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

// Importar páginas
import { Login } from './pages/Login.tsx';
import { ClientListPage } from './pages/ClientListPage.tsx';
import { ClientFormPage } from './pages/ClientFormPage.tsx';

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  // Estado de autenticação - começa sem usuário (vai para Login)
  const [user, setUser] = useState<User | null>(null);

  // Handler para login - recebe o usuário logado
  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
  };

  // Handler para logout
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        {/* 1. ROTA DE LOGIN - Pública */}
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />} 
        />

        {/* 2. ROTA DO DASHBOARD - agora aponta para a lista de clientes (com informações do usuário) */}
        <Route 
          path="/dashboard" 
          element={user ? <ClientListPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} 
        />

        {/* 3. ROTAS DO CRUD - Protegidas */}
        <Route 
          path="/clientes" 
          element={user ? <ClientListPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/clientes/novo" 
          element={user ? <ClientFormPage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/clientes/editar/:id" 
          element={user ? <ClientFormPage /> : <Navigate to="/login" replace />} 
        />

        {/* 4. ROTA ALTERNATIVA (compatibilidade) */}
        <Route 
          path="/clients/new" 
          element={user ? <ClientFormPage /> : <Navigate to="/login" replace />} 
        />

        {/* 5. ROTA RAIZ - Redireciona para Login ou Dashboard conforme autenticado */}
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </div>
  );
}

export default App;