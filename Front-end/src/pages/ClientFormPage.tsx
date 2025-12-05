import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// Imports de Lógica
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema, type ClientSchema } from "../schemas/clientSchema";
import { getClientById, createClient, updateClient } from "../data/db";

// Imports Visuais
import { Leaf, ArrowLeft, Save, X } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";

export function ClientFormPage() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<ClientSchema>({
    resolver: zodResolver(clientSchema),
  });

  useEffect(() => {
    setFocus("name");
    if (isEditing && id) {
      const client = getClientById(id);
      if (client) {
        setValue("name", client.name);
        setValue("email", client.email);
        setValue("phone", client.phone || "");
      }
    }
  }, [id, isEditing, setValue, setFocus]);

  const onSubmit: SubmitHandler<ClientSchema> = (data) => {
    if (isEditing && id) {
      updateClient(id, data);
    } else {
      createClient(data);
    }
    navigate("/clientes");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans text-gray-800 dark:text-zinc-100 -m-8 transition-colors duration-300">
      
      {/* === CABEÇALHO === */}
      <header className="bg-erp-green-light dark:bg-zinc-900 border-b-2 border-erp-green-DEFAULT dark:border-erp-green-dark px-8 py-6 shadow-sm transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-erp-green-DEFAULT dark:bg-erp-green-dark p-2 rounded-sm transition-colors">
                 <Leaf className="text-white h-6 w-6" />
              </div>
              {/* Trocamos "Sistema ERP" por algo mais genérico */}
              <h1 className="text-2xl font-bold text-erp-green-DEFAULT dark:text-green-400 tracking-tight uppercase">
                Sistema de Gestão
              </h1>
            </div>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/clientes"
              className="p-2 hover:bg-white/50 dark:hover:bg-zinc-800 rounded-full transition-colors"
              title="Voltar"
            >
              <ArrowLeft className="h-6 w-6 text-erp-green-DEFAULT dark:text-green-400" />
            </Link>
            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-zinc-200">
                {isEditing ? "Editar Registro" : "Novo Cadastro"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                Preencha os dados abaixo para {isEditing ? "atualizar" : "inserir"} um cliente.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* === ÁREA DO FORMULÁRIO === */}
      <main className="max-w-4xl mx-auto p-8">
        
        {/* Container estilo Ficha/Painel Corporativo */}
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-zinc-900 border border-erp-gray-border dark:border-erp-gray-darkBorder p-8 shadow-sm"
        >
          <div className="mb-6 border-b border-erp-gray-border dark:border-erp-gray-darkBorder pb-2">
            <h3 className="text-sm font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
              Dados Pessoais
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Campo Nome */}
            <div className="md:col-span-2 space-y-1">
              <label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-zinc-300">
                Nome Completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className={`w-full bg-white dark:bg-zinc-800 border rounded-none px-3 py-2 text-gray-800 dark:text-zinc-100 focus:outline-none focus:border-erp-green-DEFAULT transition-colors
                  ${errors.name 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-erp-gray-border dark:border-erp-gray-darkBorder'}
                `}
                placeholder="Ex: Humberto Rodrigues"
              />
              {errors.name && (
                <span className="text-red-500 text-xs font-medium block mt-1">{errors.name.message}</span>
              )}
            </div>

            {/* Campo Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-zinc-300">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="email"
                {...register("email")}
                className={`w-full bg-white dark:bg-zinc-800 border rounded-none px-3 py-2 text-gray-800 dark:text-zinc-100 focus:outline-none focus:border-erp-green-DEFAULT transition-colors
                  ${errors.email 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-erp-gray-border dark:border-erp-gray-darkBorder'}
                `}
                placeholder="Ex: humberto@email.com"
              />
              {errors.email && (
                <span className="text-red-500 text-xs font-medium block mt-1">{errors.email.message}</span>
              )}
            </div>

            {/* Campo Telefone */}
            <div className="space-y-1">
              <label htmlFor="phone" className="text-sm font-semibold text-gray-700 dark:text-zinc-300">
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                {...register("phone")}
                className="w-full bg-white dark:bg-zinc-800 border border-erp-gray-border dark:border-erp-gray-darkBorder rounded-none px-3 py-2 text-gray-800 dark:text-zinc-100 focus:outline-none focus:border-erp-green-DEFAULT transition-colors"
                placeholder="Ex: (47) 99999-9999"
              />
            </div>
          </div>

          {/* Barra de Ações */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-erp-gray-border dark:border-erp-gray-darkBorder bg-gray-50 dark:bg-zinc-800/50 -mx-8 -mb-8 p-4 mt-4">
            <Link 
              to="/clientes"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-none transition-colors"
            >
              <X className="h-4 w-4" /> Cancelar
            </Link>
            
            <button
              type="submit"
              className="flex items-center gap-2 bg-erp-green-DEFAULT hover:bg-green-700 text-white px-6 py-2 text-sm font-semibold rounded-none shadow-sm transition-colors uppercase tracking-wider"
            >
              <Save className="h-4 w-4" /> Salvar Dados
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}