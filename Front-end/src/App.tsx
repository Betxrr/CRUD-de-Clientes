// src/App.tsx
import './App.css'; // Importando o App.css (agora vazio)

// 1. Importar os componentes de Roteamento
import { Routes, Route, Navigate } from 'react-router-dom';

// 2. Importar nossa nova página
import { ClientListPage } from './pages/ClientListPage.tsx';
import { ClientFormPage } from './pages/ClientFormPage.tsx';

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* 3. Configurar o "mapa" de rotas */}
      <Routes>
        {/* Rota 1: /clientes */}
        <Route path="/clientes" element={<ClientListPage />} />
        <Route path="/clientes/novo" element={<ClientFormPage />} />
        <Route path="/clientes/editar/:id" element={<ClientFormPage />} />
        {/* Rota 2: / (raiz) -> Redireciona para /clientes */}
        <Route path="/" element={<Navigate to="/clientes" replace />} />
      </Routes>
    </div>
  );
}

export default App;