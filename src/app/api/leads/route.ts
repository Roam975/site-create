import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * API Route para processamento de leads com Dual-Write e Trigger do Agente
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const AGENTE_URL = process.env.AGENTE_URL || "https://agente.n8ndorhuan.store/new-lead";

    console.log("🚀 Processando novo lead:", data.email);

    // 1. Snapshot para o Supabase (Cloud Backup)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error: sbError } = await supabase.from("site-create").insert({
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        empresa: data.empresa || null,
        descricao: data.descricao
      });

      if (sbError) {
        console.error("⚠️ Erro ao salvar no Supabase:", sbError.message);
      } else {
        console.log("✅ Backup no Supabase concluído.");
      }
    }

    // 2. Disparo para o Agente Alexandre (ZimaOS via Public URL)
    // O Alexandre se encarrega de salvar no Postgres local e iniciar o WhatsApp
    try {
      console.log(`🔗 Notificando Agente: ${AGENTE_URL}`);
      const agentResponse = await fetch(AGENTE_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "User-Agent": "Nextjs-API-Route/1.0"
        },
        body: JSON.stringify({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          empresa: data.empresa,
          descricao: data.descricao
        }),
      });

      if (!agentResponse.ok) {
        const errorText = await agentResponse.text();
        throw new Error(`Agent response status: ${agentResponse.status} - ${errorText}`);
      }
      console.log("✅ Agente Alexandre notificado com sucesso.");
    } catch (agentErr: any) {
      console.error("❌ Erro ao conectar com Agente Alexandre:", agentErr);
      return NextResponse.json({ 
        success: true, 
        message: "Lead salvo no Supabase, mas falhou ao notificar o Agente Alexandre.",
        agent_error: agentErr.message || "Erro desconhecido na ponte do Cloudflare"
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Lead processado com sucesso" 
    });

  } catch (error) {
    console.error("🔥 Erro crítico na API de Leads:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
