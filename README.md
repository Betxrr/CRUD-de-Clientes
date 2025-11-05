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

## ✨ Funcionalidades Planejadas

* Listagem de Clientes (Read)
* Criação de Cliente (Create)
* Edição de Cliente (Update)
* Exclusão de Cliente (Delete)
* Validação de Formulário
* Navegação entre páginas

---

## 🚀 Roadmap de Desenvolvimento (Incremental)

### Fase 1: Configuração Base
- [X] Criação do projeto com Vite (React + TS).
- [X] Instalação e configuração do Tailwind CSS.
- [X] Instalação das dependências (`react-router-dom`, etc.).
- [X] Configuração do Roteador (`main.tsx`) e Estilos Globais (`index.css`).

### Fase 2: UI (Front-End Primeiro)
- [ ] Criar `ClientListPage.tsx` com **dados mockados** locais (em `src/pages`).
- [ ] Estilizar a lista e botões com Tailwind.
- [ ] Configurar a rota `/clientes` e o redirecionamento `/` no `App.tsx`.
- [ ] Criar `ClientFormPage.tsx` (para "Novo" e "Editar").
- [ ] Ligar as páginas com `Link` do React Router e `useNavigate`.

### Fase 3: Lógica e Refatoração (Quando Necessário)
- [ ] Implementar a lógica de Create, Update e Delete (ainda com mocks, usando `useState`).
- [ ] Centralizar o estado (ex: Context API) *apenas se* o "prop drilling" se tornar um problema (passando por 3+ níveis).
- [ ] Definir os tipos (ex: `IClient` em `src/types`) *apenas quando* os dados começarem a ser compartilhados entre componentes.
- [ ] Isolar Hooks customizados (ex: `useClients`) *apenas se* a lógica de estado se tornar complexa ou repetida.

### Fase 4: Ferramentas e Integração (Por Úlimo)
- [ ] Implementar `React Hook Form` no `ClientFormPage.tsx`.
- [ ] Implementar `Zod` para validação de schema.
- [ ] Isolar a lógica de dados (ex: `src/services/clientService.ts`) e conectar a uma API real.

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