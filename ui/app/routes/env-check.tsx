export async function loader() {
  return Response.json({
    hasUrl: !!process.env.VITE_SUPABASE_URL,
    hasAnon: !!process.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    hasService: !!process.env.SUPABASE_SERVICE_ROLE,
    hasDatabaseUrl: !!process.env.DATABASE_URL,
  });
}

export default function EnvCheck() {
  return null;
}
