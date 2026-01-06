import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Importo minhas telas
import { Login } from './pages/Login';
import { ClientListPage } from './pages/ClientListPage';
import { ClientFormPage } from './pages/ClientFormPage';
import { RegisterPage } from './pages/RegisterPage';
import type { User } from './data/db'; // Importo o tipo User pra usar no estado

export default function App() {
  // Começo sem nenhum usuário logado (null)
  const [user, setUser] = useState<User | null>(null);

  // Função que o Login vai chamar quando der tudo certo
  const handleLogin = (userData: User) => setUser(userData);

  // Função pra deslogar
  const handleLogout = () => setUser(null);

  const auth = (el: JSX.Element) => (user ? el : <Navigate to="/" replace />);

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />}
        />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={auth(<ClientListPage user={user!} onLogout={handleLogout} />)} />

        <Route path="/clients/new" element={auth(<ClientFormPage user={user!} onLogout={handleLogout} />)} />

        <Route path="/clients/edit/:id" element={auth(<ClientFormPage user={user!} onLogout={handleLogout} />)} />
      </Routes>
    </div>
  );
}