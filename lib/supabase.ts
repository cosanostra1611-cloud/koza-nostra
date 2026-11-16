import { createClient } from "@supabase/supabase-js";

// Javni odjemalec: samo branje aktivnih ponudnikov in izdelkov (RLS).
export function supabasePublic() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
}

// Strežniški odjemalec z polnimi pravicami. Nikoli ga ne uvozi v client komponento.
export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}
