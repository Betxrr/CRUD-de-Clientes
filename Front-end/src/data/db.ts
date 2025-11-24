export const mockClients = [
  { id: '1', name: 'Humberto Rodrigues', email: 'humberto@email.com', phone: '(47) 95001-5500' },
  { id: '2', name: 'Cliente Exemplo 2', email: 'cliente2@email.com', phone: '(11) 98888-7777' },
  { id: '3', name: 'Cliente Exemplo 3', email: 'cliente3@email.com', phone: '(21) 97777-6666' },
];

export const getClientById = (id: string) => {
  return mockClients.find(client => client.id === id);
}

// --- ADICIONAR DAQUI PARA BAIXO ---

// Tipo auxiliar para os dados de entrada (sem ID)
type ClientInput = {
  name: string;
  email: string;
  phone?: string;
};

export const createClient = (data: ClientInput) => {
  const newClient = {
    id: crypto.randomUUID(),
    ...data,
  };
  mockClients.push(newClient);
  return newClient;
};

export const updateClient = (id: string, data: ClientInput) => {
  const index = mockClients.findIndex(client => client.id === id);
  if (index !== -1) {
    mockClients[index] = { id, ...data };
    return mockClients[index];
  }
  return null;
}