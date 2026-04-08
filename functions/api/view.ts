export async function onRequestPost(context: any) {
  const { request, env } = context;
  
  try {
    const { path, referrer } = await request.json();
    
    // Cloudflare specific geo data
    const country = request.cf?.country || "Unknown";
    const city = request.cf?.city || "Unknown";
    const region = request.cf?.region || "Unknown";
    const latitude = request.cf?.latitude || null;
    const longitude = request.cf?.longitude || null;
    const timezone = request.cf?.timezone || "Unknown";
    const as_organization = request.cf?.asOrganization || "Unknown";
    const bot_score = request.cf?.botManagement?.score || null;
    const tcp_rtt = request.cf?.clientTcpRtt || null;

    const ua = request.headers.get("user-agent") || "";
    let device_type = "Desktop";
    if (/tablet|ipad|playbook|silk/i.test(ua)) {
      device_type = "Tablet";
    } else if (/mobile|iphone|ipod|android/i.test(ua)) {
      device_type = "Mobile";
    }

    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
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
        city,
        region,
        latitude,
        longitude,
        timezone,
        as_organization,
        device_type,
        bot_score,
        tcp_rtt
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
    return new Response(JSON.stringify({ error: (err as Error).message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
