import 'dotenv/config'; // Certifique-se de ter instalado: npm install dotenv
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

// Se isso imprimir "Vazio" no terminal, o arquivo .env não está sendo lido
console.log("Status da URL:", supabaseUrl ? "Carregada ✅" : "Vazio ❌");

export const supabase = createClient(supabaseUrl, supabaseKey);