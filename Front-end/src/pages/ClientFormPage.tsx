import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getClientById } from "../data/db";

export function ClientFormPage() {
  const { id } = useParams();
  const isEditing = !!id;

  // Estados para controlar os inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Efeito para carregar os dados se estivermos editando
  useEffect(() => {
    if (isEditing && id) {
      const client = getClientById(id);
      if (client) {
        setName(client.name);
        setEmail(client.email);
        setPhone(client.phone || ""); // Fallback caso phone seja undefined
      }
    }
  }, [id, isEditing]);

  return (
    <div className="space-y-6">
      {/* --- CABEÇALHO --- */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {isEditing ? "Editar Cliente" : "Novo Cliente"}
        </h2>

        <Link
          to="/clientes"
          className="text-zinc-400 hover:text-zinc-100 text-sm flex items-center gap-1"
        >
          &larr; Voltar
        </Link>
      </div>

      {/* --- CARD DO FORMULÁRIO --- */}
      <form className="bg-zinc-800 p-8 rounded-md shadow-lg max-w-3xl mx-auto border border-zinc-700/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campo: Nome (Ocupa as 2 colunas) */}
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-zinc-300">
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              required // Adicionamos validação básica de HTML5
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              placeholder="Ex: Humberto Rodrigues"
            />
          </div>

          {/* Campo: E-mail */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-300"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              placeholder="Ex: humberto@email.com"
            />
          </div>

          {/* Campo: Telefone */}
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-zinc-300"
            >
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              placeholder="Ex: (47) 99999-9999"
            />
          </div>
        </div>

        {/* --- RODAPÉ (BOTÕES) --- */}
        <div className="flex justify-end space-x-4 pt-8 mt-4 border-t border-zinc-700/50">
          <Link
            to="/clientes"
            className="px-6 py-2.5 rounded-md bg-zinc-700 hover:bg-zinc-600 text-sm font-medium transition"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-md bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium shadow-md hover:shadow-lg transition"
            onClick={(e) => {
              e.preventDefault();
              alert(`Simulando salvamento de: ${name}`);
            }}
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
