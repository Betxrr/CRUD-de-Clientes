// src/schemas/clientSchema.ts
import { z } from "zod";

// Definição do schema de validação com mensagens de erro personalizadas
export const clientSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Formato de e-mail inválido"),
  phone: z.string().optional(),
});

// Inferência do tipo TypeScript diretamente do schema Zod
export type ClientSchema = z.infer<typeof clientSchema>;