import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getProvider, callOpenAICompatible } from "./providers.ts";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function buildSystemPrompt(studentProfile: Record<string, string>): string {
  return `You are Arya, EduMesh's AI tutor for Indian competitive exam students.
Student: ${studentProfile?.name ?? "Student"}, Class ${studentProfile?.grade ?? "12"}.
Target exam: ${studentProfile?.examTarget ?? "JEE Main"}.
Weak topics: ${studentProfile?.weakTopics ?? "none identified yet"}.
Teaching: Step-by-step, Indian analogies, empathetic. Use **bold** for key terms.
Math: use $formula$ inline or $$formula$$ for block. Never just give answers — teach the method.`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");
    
    // We only enforce auth if the environment has Supabase configured
    let supabaseClient = null;
    if (supabaseUrl && supabaseKey) {
      supabaseClient = createClient(supabaseUrl, supabaseKey, {
        global: { headers: { Authorization: req.headers.get("Authorization")! } }
      });
      const { data: { user } } = await supabaseClient.auth.getUser();
      if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: CORS_HEADERS });
    }

    const { task, prompt, context, studentProfile, imageBase64 } = await req.json();

    // Cache lookup for NOTES/FORMULA tasks
    if (supabaseClient && ["NOTES", "FORMULA"].includes(task)) {
      const cacheKey = `${task}:${context?.subject}:${context?.chapter}`;
      const { data: cached } = await supabaseClient.from("ai_cache")
        .select("response_text").eq("cache_key", cacheKey).gt("expires_at", new Date().toISOString()).single();
      
      if (cached) {
        return new Response(JSON.stringify({ text: cached.response_text, cached: true }), { 
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" } 
        });
      }
    }

    const systemPrompt = buildSystemPrompt(studentProfile ?? {});
    let messages: any[] = [
      { role: "system", content: systemPrompt }, 
      { role: "user", content: prompt }
    ];

    if (imageBase64) {
      messages = [
        { role: "system", content: systemPrompt },
        { 
          role: "user", 
          content: [
            { text: prompt },
            { inlineData: { mimeType: "image/jpeg", data: imageBase64 } }
          ]
        }
      ];
    }
    
    let providerKey = getProvider(task, context?.complexity);
    let text = "";
    
    // Rate Limiting Mock (In production, use Redis or Supabase RPC)
    const rateLimitKey = `${user?.id || 'anon'}:${new Date().toISOString().split('T')[0]}`;
    // Assuming a Supabase table `api_usage` tracks this
    
    // Try primary provider, fallback to openrouter
    try { 
      text = await callOpenAICompatible(providerKey, messages, !!imageBase64); 
    } catch (e) { 
      console.warn(`Primary provider ${providerKey} failed, falling back to openrouter`, e);
      try {
        text = await callOpenAICompatible("openrouter", messages, !!imageBase64); 
        providerKey = "openrouter_fallback"; 
      } catch (fallbackError) {
        console.warn(`Fallback also failed`, fallbackError);
        return new Response(JSON.stringify({ error: "All AI providers failed. Please try again later." }), { status: 503, headers: CORS_HEADERS });
      }
    }

    // Cache the new response
    if (supabaseClient && ["NOTES", "FORMULA"].includes(task)) {
      const cacheKey = `${task}:${context?.subject}:${context?.chapter}`;
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      await supabaseClient.from("ai_cache").upsert({ 
        cache_key: cacheKey, 
        response_text: text, 
        provider: providerKey, 
        expires_at: expiresAt 
      });
    }

    return new Response(JSON.stringify({ text, provider: providerKey }), { 
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" } 
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { 
      status: 500, headers: CORS_HEADERS 
    });
  }
});
