// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Seu index.css já está correto
import App from './App.tsx';

// 1. Importar o Roteador
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root')!;

// 2. Envolver o <App /> com o <BrowserRouter>
createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);