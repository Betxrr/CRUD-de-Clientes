import { useState } from "react";
import { mockClients, deleteClient, type Client } from "../data/db";

export function useClientList() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');

  // Lógica de Exclusão
  const removeClient = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      const wasDeleted = deleteClient(id);
      
      if (wasDeleted) {
        setClients((current) => current.filter((client) => client.id !== id));
      }
    }
  };

  // Lógica de Filtragem (Movida para cá para limpar a View)
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    filteredClients, // Já entregamos a lista filtrada para a tela
    searchTerm,
    setSearchTerm,
    removeClient,
  };
}