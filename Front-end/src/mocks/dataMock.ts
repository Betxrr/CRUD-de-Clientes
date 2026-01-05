// src/mocks/dataMock.ts

// 1. Lista de Usuários permitidos (Simulando um Banco de Dados de Users)
export const USERS_MOCK = [
  { id: 1, name: "Demo User", email: "demo@empresa.com", password: "123" },
  { id: 2, name: "Outro Usuário", email: "outro@empresa.com", password: "123" }
];

// 2. Lista de Clientes (Note o campo 'ownerId' - é ele que define o dono!)
export const CLIENTS_MOCK = [
  // Clientes do Rodrigo (ID 1)
  { id: 101, ownerId: 1, name: "Padaria do Rodrigo", email: "pao@rodrigo.com", status: "Ativo" },
  { id: 102, ownerId: 1, name: "Oficina Mecânica", email: "conserto@carro.com", status: "Inativo" },
  
  // Clientes do Humberto (ID 2)
  { id: 201, ownerId: 2, name: "Consultoria Tech", email: "suporte@tech.com", status: "Ativo" },
];