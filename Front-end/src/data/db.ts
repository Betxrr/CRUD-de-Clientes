// src/data/db.ts

// Definição do tipo Client para uso em toda a aplicação
export type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

// Definição do tipo para entrada de dados (DTO), excluindo o ID gerado automaticamente
export type ClientInput = {
  name: string;
  email: string;
  phone?: string;
};

// Inicialização do banco de dados mockado
export let mockClients: Client[] = [
  { id: '1', name: 'Humberto Rodrigues', email: 'humberto@email.com', phone: '(47) 95001-5500' },
  { id: '2', name: 'Cliente Exemplo 2', email: 'cliente2@email.com', phone: '(11) 98888-7777' },
  { id: '3', name: 'Cliente Exemplo 3', email: 'cliente3@email.com', phone: '(21) 97777-6666' },
];

// Recuperação de cliente por ID
export const getClientById = (id: string) => {
  return mockClients.find(client => client.id === id);
};

// Criação de novo cliente com geração de UUID
export const createClient = (data: ClientInput) => {
  const newClient: Client = {
    id: crypto.randomUUID(),
    ...data,
  };
  mockClients.push(newClient);
  return newClient;
};

// Atualização de cliente existente preservando o ID
export const updateClient = (id: string, data: ClientInput) => {
  const index = mockClients.findIndex(client => client.id === id);
  
  if (index !== -1) {
    mockClients[index] = { ...mockClients[index], ...data };
    return mockClients[index];
  }
  return null;
};

// Remoção de cliente do array
export const deleteClient = (id: string) => {
  const index = mockClients.findIndex(client => client.id === id);
  if (index !== -1) {
    mockClients.splice(index, 1);
    return true;
  }
  return false;
};