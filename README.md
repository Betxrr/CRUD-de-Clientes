# Projeto: CRUD de Clientes (React + TypeScript + Tailwind)

Projeto de estudo focado em construir um sistema de CRUD (Create, Read, Update, Delete) para um cadastro de clientes, utilizando React, TypeScript, Tailwind CSS e boas práticas de desenvolvimento front-end.

## 🎯 Objetivo

Praticar e demonstrar habilidades em React com TypeScript, gerenciamento de estado (via services), manipulação de formulários com validação robusta (React Hook Form + Zod) e estilização eficiente com Tailwind CSS.

---

## ⚙️ Tecnologias Principais

* **React:** Biblioteca principal para a UI.
* **TypeScript:** Para tipagem estática e segurança.
* **Vite:** Build tool e servidor de desenvolvimento.
* **Tailwind CSS:** Estilização utility-first.
* **React Router Dom:** Gerenciamento de rotas.
* **React Hook Form:** Gerenciamento de formulários.
* **Zod:** Validação de schemas e inferência de tipos.
* **React Icons:** Biblioteca de ícones.

---

## ✨ Funcionalidades Planejadas

* Listagem de Clientes (Read)
* Paginação na Listagem
* Criação de Cliente (Create)
* Edição de Cliente (Update)
* Exclusão de Cliente (Delete)
* Validação de Formulário (com Zod)
* Feedback visual para o usuário (loading, sucesso, erro)

---

## 🚀 Roadmap de Desenvolvimento

### Fase 1: Setup e Configuração
-   [X] Criação do projeto com Vite (React + TS).
-   [X] Instalação e configuração do Tailwind CSS.
-   [X] Instalação das dependências (`react-router-dom`, `react-hook-form`, `zod`, `@hookform/resolvers`, `react-icons`).
-   [X] Criação da estrutura inicial de pastas.

### Fase 2: Definição do Modelo e Mock
-   [ ] Definir a interface `IClient` em `types/client.d.ts`.
-   [ ] Definir o `clientSchema` de validação em `lib/zodSchemas.ts`.
-   [ ] Implementar o "Backend Falso" (`clientService.ts`) com dados mock e funções CRUD básicas (sem delay por enquanto).

### Fase 3: Navegação e Layout Básico
-   [ ] Configurar as rotas no `router/index.tsx` (`/`, `/clientes`, `/clientes/novo`, `/clientes/editar/:id`).
-   [ ] Integrar o Router no `App.tsx`.
-   [ ] Criar um componente de Layout básico (ex: `Navbar.tsx`) se necessário.

### Fase 4: Funcionalidades Principais (CRUD)
-   [ ] Criar componentes de UI reutilizáveis (ex: `Input.tsx`, `Button.tsx`).
-   [ ] **(Read):** Implementar a `ClientListPage.tsx` para buscar (do mock service) e exibir clientes em uma tabela simples com Tailwind.
-   [ ] **(Create):** Implementar a `ClientFormPage.tsx` com `react-hook-form` e `zod` para o cadastro, chamando `createClient` do mock service.
-   [ ] Adicionar links/botões na `ClientListPage.tsx` para navegar para `/clientes/novo`.
-   [ ] **(Delete):** Adicionar botão de "Excluir" na tabela que chama `deleteClient` do mock service e atualiza a lista.
-   [ ] **(Update):** Fazer a `ClientFormPage.tsx` carregar dados do cliente (usando `getClientById` do mock) quando acessada via `/clientes/editar/:id` e chamar `updateClient` ao salvar.
-   [ ] Adicionar botão de "Editar" na tabela que navega para `/clientes/editar/:id`.

### Fase 5: Refinamentos (Opcional)
-   [ ] Adicionar feedback de loading/submitting.
-   [ ] Implementar paginação na `ClientListPage.tsx`.
-   [ ] Melhorar a estilização com Tailwind.
-   [ ] Adicionar simulação de delay (`setTimeout`) nas funções do `clientService.ts` para testar estados de loading.

---

## 🛠️ Como Rodar o Projeto Localmente

1.  Clone o repositório:
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd crud-clientes-react-ts
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
