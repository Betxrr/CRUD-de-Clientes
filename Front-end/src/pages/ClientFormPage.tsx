import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// 1. Importamos o hook da biblioteca
import { useForm } from "react-hook-form"; 
import { getClientById, createClient, updateClient, ClientInput } from "../data/db";

export function ClientFormPage() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  // 2. Inicializamos o useForm
  // A tipagem <ClientInput> ajuda o autocomplete nos campos
  const { register, handleSubmit, setValue, setFocus } = useForm<ClientInput>();

  useEffect(() => {
    // Foca no campo nome assim que a tela abre (Usabilidade!)
    setFocus("name");

    if (isEditing && id) {
      const client = getClientById(id);
      if (client) {
        // 3. Preenchemos os campos automaticamente com setValue
        setValue("name", client.name);
        setValue("email", client.email);
        setValue("phone", client.phone || "");
      }
    }
  }, [id, isEditing, setValue, setFocus]);

  // 4. Função que recebe os dados JÁ prontos do formulário
  const onSubmit = (data: ClientInput) => {
    if (isEditing && id) {
      updateClient(id, data);
    } else {
      createClient(data);
    }
    navigate("/clientes");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {isEditing ? "Editar Cliente" : "Novo Cliente"}
        </h2>
        <Link to="/clientes" className="text-zinc-400 hover:text-zinc-100 text-sm flex items-center gap-1">
          &larr; Voltar
        </Link>
      </div>

      {/* 5. O handleSubmit do RHF envolve nossa função onSubmit */}
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="bg-zinc-800 p-8 rounded-md shadow-lg max-w-3xl mx-auto border border-zinc-700/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-zinc-300">Nome Completo</label>
            <input
              type="text"
              id="name"
              // 6. Registramos o input no RHF (substitui value/onChange)
              {...register("name", { required: true })}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              placeholder="Ex: Humberto Rodrigues"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-zinc-300">E-mail</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              placeholder="Ex: humberto@email.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-zinc-300">Telefone</label>
            <input
              type="tel"
              id="phone"
              {...register("phone")}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              placeholder="Ex: (47) 99999-9999"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-8 mt-4 border-t border-zinc-700/50">
          <Link to="/clientes" className="px-6 py-2.5 rounded-md bg-zinc-700 hover:bg-zinc-600 text-sm font-medium transition">
            Cancelar
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-md bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium shadow-md hover:shadow-lg transition"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}