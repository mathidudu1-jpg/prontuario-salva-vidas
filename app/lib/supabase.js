import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** true quando as variáveis de ambiente já foram configuradas (Vercel). */
export const supabaseConfigurado = Boolean(url && anonKey);

/** Cliente público (anon). null enquanto as chaves não estiverem configuradas,
 *  para o build e a página funcionarem antes de você configurar o Supabase. */
export const supabase = supabaseConfigurado ? createClient(url, anonKey) : null;
