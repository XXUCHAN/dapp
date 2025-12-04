import { supabase } from '~/postgres/supaclient';

export async function loader() {
  const { data, error } = await supabase.from('daily_live_survey').select('count').limit(1);
  console.log(data, error);
  return Response.json({ ok: !error, error: error?.message ?? null, sample: data ?? [] });
}

export default function SupabaseCheck() {
  return null;
}
