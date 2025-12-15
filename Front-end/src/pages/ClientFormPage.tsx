import { useNavigate, useParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Leaf } from "lucide-react"; 
import { useEffect } from "react";

// Importa o esquema e o tipo
import { clientSchema, type ClientSchema } from "../schemas/clientSchema";

// 🚨 CORREÇÕES AQUI: Usando os nomes exatos das funções do seu db.ts
import { getClientById, createClient, updateClient } from "../data/db"; 


export function ClientFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isEditing = !!id;
  const pageTitle = isEditing ? 'Editar Cliente' : 'Novo Cliente';
  const pageSubtitle = isEditing ? `ID: ${id}` : 'Preencha os dados do novo cliente.';

  // 1. CONFIGURAÇÃO PRINCIPAL DO FORMULÁRIO (Manter o RHF + Zod)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ClientSchema>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  });

  // LÓGICA: Carregar dados para Edição
  useEffect(() => {
    if (isEditing && id) {
      // ✅ CORRIGIDO: Usando getClientById
      const client = getClientById(id); 

      if (client) {
        setValue('name', client.name);
        setValue('email', client.email);
        setValue('phone', client.phone);
      } else {
        alert("Cliente não encontrado!");
        navigate('/clientes');
      }
    }
  }, [id, isEditing, setValue, navigate]);

  // 2. FUNÇÃO DE ENVIO DE DADOS (LÓGICA)
  const onSubmit: SubmitHandler<ClientSchema> = (data) => {
    // ✅ CORRIGIDO: Lógica para decidir entre criar ou atualizar
    if (isEditing && id) {
        updateClient(id, data); //
    } else {
        createClient(data); //
    }

    const mode = isEditing ? 'Edição' : 'Criação';
    alert(`${mode} bem-sucedida para o cliente: ${data.name}`);
    
    navigate('/clientes');
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      
      {/* === CABEÇALHO INTEGRADO (Estilo Lovable) === */}
      <header className="bg-primary border-b-4 border-primary-dark px-8 py-6 shadow-md transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          
          {/* Título do Sistema */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary-dark p-2 transition-colors">
              <Leaf className="text-primary-foreground h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-primary-foreground tracking-tight uppercase">
              Sistema ERP
            </h1>
          </div>

          {/* Título da Página e Botão Voltar */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/clientes')} 
              className="flex items-center gap-2 text-primary-foreground hover:text-primary-light transition-colors"
              title="Voltar para a Lista"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-xl font-semibold text-primary-foreground">
                {pageTitle}
              </h2>
              <p className="text-sm text-primary-foreground/70">
                {pageSubtitle}
              </p>
            </div>
          </div>
        </div>
      </header>
      
      {/* 🟢 CONTAINER PRINCIPAL DO FORMULÁRIO */}
      <main className="max-w-xl mx-auto px-8 py-10">
        
        {/* === O FORMULÁRIO EM SI (Estilo de Card) === */}
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-card p-8 shadow-2xl border border-border space-y-6"
        >
          
          {/* Campo NOME */}
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-foreground">Nome Completo</label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`input-search w-full ${
                errors.name 
                  ? 'border-destructive focus:ring-destructive' 
                  : 'focus:border-primary focus:ring-primary'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Campo EMAIL */}
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`input-search w-full ${
                errors.email 
                  ? 'border-destructive focus:ring-destructive' 
                  : 'focus:border-primary focus:ring-primary'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Campo TELEFONE */}
          <div className="space-y-1">
            <label htmlFor="phone" className="block text-sm font-medium text-foreground">Telefone</label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              className={`input-search w-full ${
                errors.phone 
                  ? 'border-destructive focus:ring-destructive' 
                  : 'focus:border-primary focus:ring-primary'
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Botão de Submissão */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-accent justify-center py-3 disabled:bg-muted disabled:text-muted-foreground"
          >
            {isSubmitting ? 'Salvando...' : (isEditing ? 'Salvar Edição' : 'Cadastrar Cliente')}
          </button>
        </form>
      </main>
    </div>
  );
}