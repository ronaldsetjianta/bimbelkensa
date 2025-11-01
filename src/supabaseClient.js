import { createClient } from '@supabase/supabase-js';

// Ganti dengan URL dan Kunci Anon Anda
const supabaseUrl = 'https://ebtsqcdlstqzpnwdpyjl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVidHNxY2Rsc3RxenBud2RweWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5Nzc4OTYsImV4cCI6MjA3NzU1Mzg5Nn0.gfkrCRB2EjR816fYZdyGfFhJiQnyfm1wh674GX1bIFc';

export const supabase = createClient(supabaseUrl, supabaseKey);