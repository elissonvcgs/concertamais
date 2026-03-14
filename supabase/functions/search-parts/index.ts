import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { partType, deviceModel } = await req.json();

    if (!partType || !deviceModel) {
      return new Response(
        JSON.stringify({ error: "partType e deviceModel são obrigatórios" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const prompt = `Busque peças de reposição para celulares/eletrônicos à venda em lojas online brasileiras.

Peça: ${partType}
Modelo do dispositivo: ${deviceModel}

Retorne de 5 a 8 resultados reais de lojas brasileiras (como Mercado Livre, Shopee, AliExpress, Amazon Brasil, Magazine Luiza, Americanas etc).

Para cada resultado inclua:
- Nome do produto
- Preço estimado em reais (R$)
- Nome da loja
- URL do produto (link real se possível, ou link de busca da loja)

Responda APENAS com JSON válido no formato:
{
  "results": [
    {
      "name": "string",
      "price": "string (ex: R$ 89,90)",
      "store": "string",
      "url": "string"
    }
  ]
}`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content:
                "Você é um assistente especializado em buscar peças de reposição para eletrônicos em lojas online brasileiras. Sempre responda em JSON válido.",
            },
            { role: "user", content: prompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Muitas requisições. Tente novamente em alguns segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Entre em contato com o administrador." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Erro ao buscar produtos" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Extract JSON from response (handle markdown code blocks)
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse AI response:", content);
      parsed = { results: [] };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("search-parts error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
