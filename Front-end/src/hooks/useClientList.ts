import { useEffect, useState } from "react";
import { deleteClient, getClients, type Client } from "../data/db";

export function useClientList(userId: string | null) {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    if (!userId) {
      setClients([]);
      return;
    }

    const list = getClients(userId);
    setClients(list);
  }, [userId]);
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