export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const { path, referrer } = await request.json();
    
    // Cloudflare specific geo data
    const country = request.cf?.country || "Unknown";
    const city = request.cf?.city || "Unknown";

    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return new Response(JSON.stringify({ error: "Missing Supabase env vars in Cloudflare" }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/visits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseAnonKey,
        "Authorization": `Bearer ${supabaseAnonKey}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        path,
        referrer,
        country,
        city
      })
    });

    if (!response.ok) {
      const error = await response.text();
      return new Response(JSON.stringify({ error }), { 
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
