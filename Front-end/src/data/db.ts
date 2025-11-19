export const mockClients = [
  { id: '1', name: 'Humberto Rodrigues', email: 'humberto@email.com', phone: '(47) 95001-5500' },
  { id: '2', name: 'Cliente Exemplo 2', email: 'cliente2@email.com', phone: '(11) 98888-7777' },
  { id: '3', name: 'Cliente Exemplo 3', email: 'cliente3@email.com', phone: '(21) 97777-6666' },
];

export const getClientById = (id: string) => {
  return mockClients.find(client => client.id === id);
}