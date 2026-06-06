export default async function handler(context, event) {
  const { text, from, platform } = event.message;
  const apiKey = context.config.edumesh_api_key;
  const baseUrl = context.config.edumesh_url;

  if (!apiKey) {
    return context.reply("Please configure your EduMesh API key in OpenClaw settings to use this skill.");
  }

  // Handle explicit commands
  if (text.startsWith('/')) {
    const [command, ...args] = text.slice(1).split(' ');
    const query = args.join(' ');

    switch (command.toLowerCase()) {
      case 'doubt':
        return await handleDoubt(context, query, apiKey, baseUrl);
      case 'quiz':
        return await handleQuiz(context, query, apiKey, baseUrl);
      case 'plan':
        return await handlePlan(context, query, apiKey, baseUrl);
      case 'note':
        return await handleNote(context, query, apiKey, baseUrl);
      default:
        return context.reply("Unknown command. Try /doubt [question], /quiz [topic], /plan [exam], or /note [topic].");
    }
  }

  // Fallback to natural chat (Arya)
  return await handleDoubt(context, text, apiKey, baseUrl);
}

async function handleDoubt(context, query, apiKey, baseUrl) {
  if (!query) return context.reply("Please provide a question. Example: /doubt What is the first law of thermodynamics?");
  
  context.reply("Thinking... 🧠");
  
  try {
    // In a real app, this would hit the Supabase Edge Function directly
    const response = await fetch(`${baseUrl}/functions/v1/ai-router`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ task: 'DOUBT_TEXT', prompt: query })
    });

    if (!response.ok) throw new Error("API Error");
    const data = await response.json();
    return context.reply(data.reply);
  } catch (e) {
    return context.reply("Sorry, Arya is having trouble connecting to the EduMesh servers right now.");
  }
}

async function handleQuiz(context, topic, apiKey, baseUrl) {
  if (!topic) return context.reply("Please provide a topic. Example: /quiz Kinematics");
  return context.reply(`Generating a quick quiz on ${topic}... (Feature coming soon via OpenClaw!)`);
}

async function handlePlan(context, exam, apiKey, baseUrl) {
  return context.reply(`Here is your summary for today's mission. (Feature coming soon via OpenClaw!)`);
}

async function handleNote(context, topic, apiKey, baseUrl) {
  return context.reply(`Fetching your notes on ${topic}... (Feature coming soon via OpenClaw!)`);
}
