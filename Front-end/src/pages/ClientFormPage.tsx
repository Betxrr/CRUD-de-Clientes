import { Link, useParams } from "react-router-dom";

export function ClientFormPage() {
    
    const { id } = useParams();
    const isEditing = !!id;

  return (
    <div>
      {/* Cabeçalho */}
      <div className="flex justify-between ">
        <h2 className="text-2xl font-semibold mb-6">
          {isEditing ? "Editar Cliente" : "Novo Cliente"}
        </h2>
        <Link
          to="/clientes"
          className="bg-sky-500 hover:bg-sky-600 
                     text-white hover:text-blue-100 
                    px-4 py-2 transition-all 
                    duration-200 flex items-center 
                    gap-2 text-sm font-medium 
                    shadow-lg hover:shadow-sky-500/25 hover:scale-105"
        >
          <span className="text-lg">←</span>
          Voltar para Lista
        </Link>
      </div>
      {/* Formulario */}
      <div></div>
    </div>
  );
}
