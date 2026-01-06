# Projeto: CRUD de Clientes (React + TypeScript + Tailwind)

Projeto de estudo focado em construir um sistema de CRUD (Create, Read, Update, Delete) para um cadastro de clientes, utilizando React com TypeScript, Tailwind CSS e um fluxo de desenvolvimento incremental(YAGNI).

## 🎯 Objetivo

Praticar e demonstrar habilidades em React com TypeScript, focando em um fluxo de desenvolvimento incremental, componentização, gerenciamento de estado e estilização eficiente com Tailwind CSS.

---

## ⚙️ Tecnologias Principais

* **React:** Biblioteca principal para a UI.
* **TypeScript:** Para tipagem estática (introduzido gradualmente).
* **Vite:** Build tool e servidor de desenvolvimento.
* **Tailwind CSS:** Estilização utility-first.
* **React Router Dom:** Gerenciamento de rotas.
* **React Hook Form:** Gerenciamento de formulários (etapa futura).
* **Zod:** Validação de schemas (etapa futura).

---

## ✨ Funcionalidades

### ✅ Implementadas
- [x] Autenticação com usuário demo (`demo@empresa.com` / `123`)
- [x] Listagem de Clientes (Read) com filtro de busca
- [x] Criação de Cliente (Create) com persistência em `localStorage`
- [x] Edição de Cliente (Update)
- [x] Exclusão de Cliente (Delete)
- [x] Navegação entre páginas (React Router)
- [x] Seed automático de 3 clientes demo
- [x] Design system Tailwind v4 (tema claro/escuro)
- [x] Tipagem forte (TypeScript)
- [x] Isolamento de lógica em hooks (`useClientList`)
- [x] Persistência via `localStorage` (`src/data/db.ts`)

### 📋 Backlog (Futuro)
- [ ] Validação com React Hook Form + Zod
- [ ] API backend (Node.js / Express)
- [ ] Autenticação JWT
- [ ] Paginação na tabela
- [ ] Exportar dados (CSV/PDF)
- [ ] Dashboard com gráficos
- [ ] Notificações (toast)
- [ ] Testes automatizados (Jest + React Testing Library)
- [ ] Dark mode persistente
- [ ] Integração com UI component library (Shadcn/ui)
- [ ] Mobile responsivo otimizado

---

## 🚀 Roadmap de Desenvolvimento (Incremental)

### Fase 1: Configuração Base ✅
- [x] Criação do projeto com Vite (React + TS).
- [x] Instalação e configuração do Tailwind CSS.
- [x] Instalação das dependências (`react-router-dom`, etc.).
- [x] Configuração do Roteador (`main.tsx`) e Estilos Globais (`index.css`).

### Fase 2: UI (Front-End Primeiro) ✅
- [x] Criar `ClientListPage.tsx` com **dados mockados** locais (em `src/pages`).
- [x] Estilizar a lista e botões com Tailwind.
- [x] Configurar as rotas (`/login`, `/dashboard`, `/clients/new`, `/clients/edit/:id`).
- [x] Criar `ClientFormPage.tsx` (para "Novo" e "Editar").
- [x] Ligar as páginas com `Link` do React Router e `useNavigate`.
- [x] Criar página de `Login.tsx` com autenticação demo.

### Fase 3: Lógica e Refatoração ✅
- [x] Implementar a lógica de Create, Update e Delete (com mocks e `useState`).
- [x] Centralizar estado com Context via `src/data/db.ts` (persistência `localStorage`).
- [x] Definir tipos (`User`, `Client`) em `src/data/db.ts`.
- [x] Isolar Hooks customizados (`useClientList`) com filtro e exclusão.
- [x] Refatorar `App.tsx` para proteger rotas autenticadas.

### Fase 4: Ferramentas e Integração (Futuro)
- [ ] Implementar `React Hook Form` no `ClientFormPage.tsx`.
- [ ] Implementar `Zod` para validação de schema.
- [ ] Isolar a lógica de dados em `src/services/clientService.ts`.
- [ ] Conectar a uma API real (Node.js / Express).
- [ ] Autenticação JWT.

---

## 🛠️ Como Rodar o Projeto Localmente

1.  Clone o repositório:
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    ```
2.  Navegue até a pasta `Front-end`:
    ```bash
    cd [NOME_DA_PASTA_DO_PROJETO]/Front-end
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
5.  Abra `http://localhost:5173` (ou a porta indicada) no seu navegador.