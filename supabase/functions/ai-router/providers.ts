const PROVIDERS = {
  groq: { 
    url: "https://api.groq.com/openai/v1/chat/completions", 
    key: Deno.env.get("GROQ_API_KEY"), 
    model: "llama-3.3-70b-versatile" 
  },
  gemini: { 
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", 
    key: Deno.env.get("GEMINI_API_KEY") 
  },
  deepseek: { 
    url: "https://api.deepseek.com/v1/chat/completions", 
    key: Deno.env.get("DEEPSEEK_API_KEY"), 
    model: "deepseek-reasoner" 
  },
  openrouter: { 
    url: "https://openrouter.ai/api/v1/chat/completions", 
    key: Deno.env.get("OPENROUTER_API_KEY"), 
    model: "meta-llama/llama-3-8b-instruct" 
  },
  cloudflare: {
    url: `https://api.cloudflare.com/client/v4/accounts/${Deno.env.get("CF_ACCOUNT_ID")}/ai/run/`,
    key: Deno.env.get("CLOUDFLARE_AI_TOKEN"),
    model: "@cf/meta/llama-3.1-8b-instruct"
  }
};

export function getProvider(task: string, complexity: string = "normal"): string {
  if (complexity === "high") return "deepseek";
  
  const map: Record<string, string> = {
    DOUBT_TEXT: "groq", 
    CHAT: "groq", 
    QUIZ_GENERATE: "groq",
    DOUBT_IMAGE: "gemini", 
    NOTES: "gemini", 
    PLANNER: "gemini",
    MATH_HARD: "deepseek", 
    PHYSICS: "deepseek", 
    ANALYSIS: "deepseek",
    FLASHCARD: "cloudflare",
    FORMULA: "cloudflare",
    VOICE: "groq",
    STUDY_PLAN: "gemini",
    MOCK_ANALYSIS: "deepseek",
    PYQ_PATTERN: "deepseek",
  };
  return map[task] ?? "groq";
}

export async function callOpenAICompatible(provider: string, messages: unknown[], isImage: boolean = false): Promise<string> {
  const p = PROVIDERS[provider as keyof typeof PROVIDERS] as Record<string, string>;
  
  if (!p || !p.key) {
    throw new Error(`Provider ${provider} is not configured (missing API key).`);
  }

  // Handle Gemini specifically as it uses a different structure
  if (provider === "gemini") {
    const formattedContents = messages.map((m: any) => ({
      role: m.role === "system" ? "user" : m.role === "assistant" ? "model" : "user",
      parts: isImage ? m.content : [{ text: m.content }]
    }));
    
    // Quick hack: prepend system message to first user message if present
    if (messages[0].role === "system" && messages.length > 1) {
      formattedContents[1].parts[0].text = `System: ${messages[0].content}\n\nUser: ${messages[1].content}`;
      formattedContents.shift();
    }

    const res = await fetch(`${p.url}?key=${p.key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedContents })
    });

    if (!res.ok) throw new Error(`Gemini error: ${res.status}`);
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  }

  // Handle Cloudflare specifically
  if (provider === "cloudflare") {
    const res = await fetch(`${p.url}${p.model}`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${p.key}` 
      },
      body: JSON.stringify({ messages, max_tokens: 1500 })
    });

    if (!res.ok) throw new Error(`Cloudflare error: ${res.status}`);
    const data = await res.json();
    return data.result?.response ?? "";
  }

  // OpenAI format for Groq, DeepSeek, OpenRouter
  const res = await fetch(p.url, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json", 
      Authorization: `Bearer ${p.key}` 
    },
    body: JSON.stringify({ 
      model: p.model, 
      messages, 
      max_tokens: provider === "deepseek" ? 4096 : 1500, 
      temperature: 0.7 
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`${provider} error: ${res.status} - ${errText}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}
