export async function loader() {
  console.log(
    process.env.DATABASE_URL,
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY
  );
  return Response.json({
    hasUrl: !!process.env.VITE_SUPABASE_URL,
    hasAnon: !!process.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    hasDatabaseUrl: !!process.env.DATABASE_URL,
  });
}

export default function EnvCheck() {
  return null;
}
