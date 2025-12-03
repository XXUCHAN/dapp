import { createClient } from '@supabase/supabase-js';

export async function loader() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE;

  if (!url || !key) {
    return Response.json({ ok: false, error: 'Missing SUPABASE env', sample: [] }, { status: 500 });
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase.from('daily_live_survey').select('count').limit(1);

  return Response.json({ ok: !error, error: error?.message ?? null, sample: data ?? [] });
}

export default function SupabaseCheck() {
  return null;
}
