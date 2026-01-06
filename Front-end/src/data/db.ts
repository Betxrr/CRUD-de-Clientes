// Tipos que eu vou usar no sistema todo
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Client = {
  id: string;
  ownerId: string; // Aqui eu guardo o ID de quem criou esse cliente
  name: string;
  email: string;
  phone?: string;
  status: 'Ativo' | 'Inativo';
};

// Aqui eu defino as chaves pra salvar no LocalStorage do navegador
const KEY_CLIENTS = 'app_clients_data';
const KEY_USERS = 'app_users_data';

// Funçãozinha pra carregar dados sem ter que repetir código toda hora
const loadData = <T>(key: string): T[] => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

// Funçãozinha pra salvar os dados de volta no navegador
const saveData = (key: string, data: any[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Importar mocks para forçar dados demo
import { USERS_MOCK, CLIENTS_MOCK } from '../mocks/dataMock';





// ----------------

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                   BANCO DE USUARIO - LOGIN
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// ----------------





// Aqui eu crio um usuário novo e verifico se o email já existe
export const createUser = (name: string, email: string, password: string) => {
  const users = loadData<User>(KEY_USERS);
  
  if (users.find(u => u.email === email)) {
    throw new Error("Já existe uma conta com esse e-mail.");
  }

  const newUser: User = { 
    id: crypto.randomUUID(), // Gera um ID único aleatório
    name, 
    email, 
    password 
  };
  
  users.push(newUser);
  saveData(KEY_USERS, users);
  return newUser;
};

// Aqui eu verifico se o email e senha batem pra fazer o login
export const authenticateUser = (email: string, password: string) => {
  const users = loadData<User>(KEY_USERS);
  
  // Deixei esse usuário de teste caso eu precise entrar rápido sem cadastro
  if (email === 'demo@empresa.com' && password === '123') {
    // Força os dados de demo (overwrite) para garantir comportamento determinístico
    saveData(KEY_USERS, USERS_MOCK as any);
    // Normaliza ownerId para o primeiro usuário de USERS_MOCK
    const demoOwnerId = String(USERS_MOCK[0].id ?? '1');
    const normalizedClients = (CLIENTS_MOCK || []).map(c => ({ ...c, ownerId: demoOwnerId }));
    saveData(KEY_CLIENTS, normalizedClients as any);

    // Retorna o usuário demo correspondente ao primeiro mock
    return { id: demoOwnerId, name: USERS_MOCK[0].name, email, password };
  }

  return users.find(u => u.email === email && u.password === password) || null;
};





// ----------------




// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                   BANCO DE CLIENTES - CRUD
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


// ----------------








// Aqui eu busco SÓ os clientes do usuário que está logado (uso o userId pra filtrar)
export const getClients = (userId: string) => {
  const allClients = loadData<Client>(KEY_CLIENTS);
  return allClients.filter(c => c.ownerId === userId);
};

// Busco um cliente específico pelo ID dele (pra editar depois)
export const getClientById = (id: string) => {
  const allClients = loadData<Client>(KEY_CLIENTS);
  return allClients.find(client => client.id === id);
};

// Crio um cliente novo e JÁ vinculo ele ao usuário logado (ownerId)
export const createClient = (data: Omit<Client, 'id' | 'ownerId'>, userId: string) => {
  const allClients = loadData<Client>(KEY_CLIENTS);
  
  const newClient: Client = {
    id: crypto.randomUUID(),
    ownerId: userId, // O segredo tá aqui: amarro o cliente ao dono
    ...data,
  };
  
  allClients.push(newClient);
  saveData(KEY_CLIENTS, allClients);
  return newClient;
};

// Atualizo os dados de um cliente existente
export const updateClient = (id: string, data: Partial<Client>) => {
  const allClients = loadData<Client>(KEY_CLIENTS);
  const index = allClients.findIndex(c => c.id === id);
  
  if (index !== -1) {
    allClients[index] = { ...allClients[index], ...data };
    saveData(KEY_CLIENTS, allClients);
    return allClients[index];
  }
  return null;
};

// Deleto o cliente da lista e salvo de novo
export const deleteClient = (id: string) => {
  let allClients = loadData<Client>(KEY_CLIENTS);
  const filtered = allClients.filter(c => c.id !== id);
  
  if (filtered.length < allClients.length) {
    saveData(KEY_CLIENTS, filtered);
    return true;
  }
  return false;
};