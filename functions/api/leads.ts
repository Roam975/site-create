export async function onRequestPost(context: any) {
  const { request, env } = context;
  
  try {
    const data = await request.json();
    const AGENTE_URL = env.AGENTE_URL || "https://agente.n8ndorhuan.store/new-lead";

    // Cloudflare specific geo data
    const country = request.cf?.country || "Unknown";
    const city = request.cf?.city || "Unknown";

    console.log(`🚀 [Functions] Processando novo lead de ${city}, ${country}:`, data.email);

    // 1. Snapshot para o Supabase (Cloud Backup)
    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/site-create`, {
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

        if (!response.ok) {
          console.error("⚠️ [Functions] Erro ao salvar no Supabase:", await response.text());
        } else {
          console.log("✅ [Functions] Backup no Supabase concluído.");
        }
      } catch (sbError: any) {
        console.error("⚠️ [Functions] Erro na conexão com Supabase:", sbError.message);
      }
    }

    // 2. Disparo para o Agente Alexandre (ZimaOS via Public URL)
    try {
      console.log(`🔗 [Functions] Notificando Agente: ${AGENTE_URL}`);
      const agentResponse = await fetch(AGENTE_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "User-Agent": "Cloudflare-Pages-Function/1.0"
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
        throw new Error(`Agent response status: ${agentResponse.status} - ${errorText}`);
      }
      
      console.log("✅ [Functions] Agente Alexandre notificado com sucesso.");
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Lead processado com sucesso" 
      }), {
        headers: { "Content-Type": "application/json" }
      });

    } catch (agentErr: any) {
      console.error("❌ [Functions] Erro ao conectar com Agente Alexandre:", agentErr);
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Lead salvo no Supabase, mas falhou ao notificar o Agente Alexandre.",
        agent_error: agentErr.message || "Erro desconhecido na ponte do Cloudflare"
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

  } catch (error: any) {
    console.error("🔥 [Functions] Erro crítico na API de Leads:", error);
    return new Response(JSON.stringify({ success: false, error: error.message || "Internal Server Error" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
