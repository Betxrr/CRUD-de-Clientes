import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// Importação do React Hook Form e do adaptador para Zod
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Importação do schema de validação e funções de dados
import { clientSchema, type ClientSchema } from "../schemas/clientSchema";
import { getClientById, createClient, updateClient } from "../data/db";

export function ClientFormPage() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  // Inicialização do formulário com integração Zod para validação
  // O modo 'all' valida tanto no evento onBlur quanto no onChange
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<ClientSchema>({
    resolver: zodResolver(clientSchema),
  });

  // Carregamento dos dados iniciais em caso de edição
  useEffect(() => {
    setFocus("name"); // Definição de foco inicial no campo Nome

    if (isEditing && id) {
      const client = getClientById(id);
      if (client) {
        // Preenchimento dos campos com dados existentes
        setValue("name", client.name);
        setValue("email", client.email);
        setValue("phone", client.phone || "");
      }
    }
  }, [id, isEditing, setValue, setFocus]);

  // Processamento do envio do formulário após validação bem-sucedida
  const onSubmit: SubmitHandler<ClientSchema> = (data) => {
    if (isEditing && id) {
      updateClient(id, data);
    } else {
      createClient(data);
    }
    // Redirecionamento para a lista de clientes
    navigate("/clientes");
  };

  return (
    <div className="space-y-6">
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-zinc-800 p-8 rounded-md shadow-lg max-w-3xl mx-auto border border-zinc-700/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Campo Nome */}
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-zinc-300">
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className={`w-full bg-zinc-900 border rounded-md px-4 py-2.5 text-zinc-100 focus:outline-none transition
                ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700 focus:border-sky-500 focus:ring-sky-500'}
              `}
              placeholder="Ex: Humberto Rodrigues"
            />
            {/* Exibição condicional da mensagem de erro */}
            {errors.name && (
              <span className="text-red-500 text-xs">{errors.name.message}</span>
            )}
          </div>

          {/* Campo Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-zinc-300">
              E-mail
            </label>
            <input
              type="text"
              id="email"
              {...register("email")}
              className={`w-full bg-zinc-900 border rounded-md px-4 py-2.5 text-zinc-100 focus:outline-none transition
                ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700 focus:border-sky-500 focus:ring-sky-500'}
              `}
              placeholder="Ex: humberto@email.com"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email.message}</span>
            )}
          </div>

          {/* Campo Telefone */}
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-zinc-300">
              Telefone
            </label>
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
          <Link
            to="/clientes"
            className="px-6 py-2.5 rounded-md bg-zinc-700 hover:bg-zinc-600 text-sm font-medium transition"
          >
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