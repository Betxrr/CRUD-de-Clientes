// src/App.tsx
import './App.css'; // Importando o App.css (agora vazio)

// 1. Importar os componentes de Roteamento
import { Routes, Route, Navigate } from 'react-router-dom';

// 2. Importar nossa nova página
import { ClientListPage } from './pages/ClientListPage.tsx';
import { ClientFormPage } from './pages/ClientFormPage.tsx';

function App() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-sky-400">
        Painel de Clientes
      </h1>

      <main>
        {/* 3. Configurar o "mapa" de rotas */}
        <Routes>
          {/* Rota 1: /clientes */}
          <Route path="/clientes" element={<ClientListPage />} />
          <Route path="/clientes/novo" element={<ClientFormPage />} />
          <Route path="/clientes/editar/:id" element={<ClientFormPage />} />
          {/* Rota 2: / (raiz) -> Redireciona para /clientes */}
          <Route path="/" element={<Navigate to="/clientes" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;