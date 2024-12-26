import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://epewufetafbtpqiribsc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZXd1ZmV0YWZidHBxaXJpYnNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4NzAyNDAsImV4cCI6MjA0ODQ0NjI0MH0.CLxGvTYNw5sPrGnnSKWj__vEbCQaxLXlUCWMTx5iuzw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);