export async function onRequestPost(context: any) {
  const { request, env } = context;
  
  try {
    let data: any;
    try {
      data = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid JSON body", details: (e as Error).message }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const AGENTE_URL = env.AGENTE_URL || "https://agente.n8ndorhuan.store/new-lead";

    // Cloudflare specific geo data
    const country = request.cf?.country || "Unknown";
    const city = request.cf?.city || "Unknown";

    console.log(`🚀 [Functions] Processando novo lead: ${data.email || 'no-email'} from ${city}, ${country}`);

    // 1. Snapshot para o Supabase (Cloud Backup)
    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/site-create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": supabaseKey,
            "Authorization": `Bearer ${supabaseKey}`,
            "Prefer": "return=minimal"
          },
          body: JSON.stringify({
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            empresa: data.empresa || null,
            descricao: data.descricao,
            country,
            city
          })
        });
      } catch (sbError: any) {
        console.error("⚠️ [Functions] Erro Supabase:", sbError.message);
      }
    }

    // 2. Disparo para o Agente Alexandre (ZimaOS via Public URL)
    try {
      const agentResponse = await fetch(AGENTE_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "User-Agent": "Cloudflare-Pages-Function/1.1"
        },
        body: JSON.stringify({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          empresa: data.empresa,
          descricao: data.descricao,
          geo: { country, city }
        }),
      });

      if (!agentResponse.ok) {
        const errorText = await agentResponse.text();
        return new Response(JSON.stringify({ 
          success: false, 
          message: "Falha na resposta do Agente",
          status: agentResponse.status,
          details: errorText
        }), {
          status: 502,
          headers: { "Content-Type": "application/json" }
        });
      }
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Lead processado com sucesso" 
      }), {
        headers: { "Content-Type": "application/json" }
      });

    } catch (agentErr: any) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: "Erro de conexão com o Agente",
        error: agentErr.message
      }), {
        status: 504,
        headers: { "Content-Type": "application/json" }
      });
    }

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
