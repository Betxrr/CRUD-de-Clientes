// src/data/db.ts

// 1. Definição do Tipo (Contribuição do Copilot - Excelente!)
export type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string; // O '?' diz pro TS que esse campo não é obrigatório
};

// 2. Tipo para entrada de dados (sem ID)
type ClientInput = {
  name: string;
  email: string;
  phone?: string;
};

// 3. Array Tipado
// eslint-disable-next-line prefer-const
export let mockClients: Client[] = [
  { id: '1', name: 'Humberto Rodrigues', email: 'humberto@email.com', phone: '(47) 95001-5500' },
  { id: '2', name: 'Cliente Exemplo 2', email: 'cliente2@email.com', phone: '(11) 98888-7777' },
  { id: '3', name: 'Cliente Exemplo 3', email: 'cliente3@email.com', phone: '(21) 97777-6666' },
];

export const getClientById = (id: string) => {
  return mockClients.find(client => client.id === id);
}

// --- FUNÇÕES DE CRUD ---

export const createClient = (data: ClientInput) => {
  const newClient: Client = {
    id: crypto.randomUUID(),
    ...data,
  };
  mockClients.push(newClient);
  return newClient;
};


// src/data/db.ts

// ... (código anterior createClient/updateClient) ...

/**
 * Remove um cliente pelo ID.
 * @param id - string (Tipagem explícita para garantir que não passamos número)
 * @returns boolean - Retorna true se deletou, false se não achou.
 */
export const deleteClient = (id: string): boolean => {
  const index = mockClients.findIndex(client => client.id === id);
  
  if (index > -1) {
    // O método splice remove itens de um array
    // (índice onde começar, quantos deletar)
    mockClients.splice(index, 1);
    return true;
  }
  return false;
};






export const updateClient = (id: string, data: ClientInput) => {
  const index = mockClients.findIndex(client => client.id === id);
  
  if (index !== -1) {
    // AQUI: Usamos a forma segura (preserva campos antigos não alterados)
    mockClients[index] = { ...mockClients[index], ...data };
    return mockClients[index];
  }
  return null;
};