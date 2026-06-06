import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

/**
 * Unified AI service client.
 * Calls the Supabase Edge Function `ai-router` instead of the local Express proxy.
 */
export async function callAIRouter({ task, prompt, context = {}, imageBase64 = null }) {
 const { user } = useAuthStore.getState();
 
 // Prepare student profile context
 const studentProfile = {
 name: user?.display_name || user?.email?.split('@')[0] || 'Student',
 grade: '12', // Would fetch from DB ideally
 examTarget: 'JEE Main',
 weakTopics: 'none',
 };

 try {
 // Call Supabase Edge Function
 const { data, error } = await supabase.functions.invoke('ai-router', {
 body: {
 task,
 prompt,
 context,
 studentProfile,
 imageBase64
 }
 });

 if (error) {
 console.error('Edge function error:', error);
 throw error;
 }

 return data.text;
 } catch (err) {
 console.error('AI Router Error:', err);
 
 // Fallback logic for local development if Edge Function isn't deployed yet
 console.warn("Falling back to local development proxy...");
 return await fallbackLocalAI(prompt);
 }
}

/**
 * Fallback to the local dev server proxy if the Edge Function fails or isn't deployed
 */
async function fallbackLocalAI(prompt) {
 try {
 const res = await fetch('/api/chat', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 messages: [
 { role: 'system', content: 'You are Arya, EduMesh AI tutor. Answer cleanly.' },
 { role: 'user', content: prompt }
 ],
 model: 'llama-3.1-8b-instant',
 temperature: 0.7,
 stream: false,
 }),
 });
 
 if (!res.ok) throw new Error('Local fallback failed');
 const data = await res.json();
 return data.choices?.[0]?.message?.content || "No response generated.";
 } catch (error) {
 return "❌ I'm currently offline. Please ensure the backend is running.";
 }
}

// ---------------------------------------------------------
// Feature-Specific Wrapper Functions
// ---------------------------------------------------------

export async function sendAryaDoubt(message, subjectContext = 'General') {
 return await callAIRouter({
 task: 'DOUBT_TEXT',
 prompt: message,
 context: { subject: subjectContext }
 });
}

export async function generateQuiz(subject, topic, numQuestions = 5) {
 const prompt = `Generate exactly ${numQuestions} multiple-choice quiz questions for ${subject}: ${topic}. Return ONLY a valid JSON array where each object has: "question", "options" (array of 4 strings), "correctIndex" (0-3), and "explanation". No markdown block formatting around the JSON, just the raw JSON.`;
 
 const reply = await callAIRouter({ task: 'QUIZ_GENERATE', prompt });
 try {
 const cleaned = reply.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
 return JSON.parse(cleaned);
 } catch (e) {
 console.error("Quiz parsing error:", e);
 return null;
 }
}

export async function generateStudyNotes(subject, topic) {
 const prompt = `Generate comprehensive study notes for ${subject}: ${topic}. Use markdown. Include a Summary, Key Concepts, Important Formulas, and Examples.`;
 return await callAIRouter({ task: 'NOTES', prompt, context: { subject, chapter: topic } });
}

// ---------------------------------------------------------
// Legacy Feature Wrappers (for backward compatibility)
// ---------------------------------------------------------

export async function sendChatMessage(message, externalHistory = []) {
 const historyText = externalHistory.map(m => `${m.role}: ${m.text}`).join('\n');
 const prompt = `History:\n${historyText}\nUser: ${message}`;
 return await callAIRouter({ task: 'CHAT', prompt });
}

export async function sendChatWithDocument(message, documentText, externalHistory = []) {
 const prompt = `Document Context:\n${documentText.slice(0, 5000)}\nUser: ${message}`;
 return await callAIRouter({ task: 'CHAT', prompt });
}

export async function generateMindTree(topic) {
 const prompt = `Construct a Mind Map for the topic: "${topic}". Return exactly a valid JSON array of node objects. Each object MUST have: "id", "label", "parentId". Limit to 7-10 nodes. ONLY JSON.`;
 const reply = await callAIRouter({ task: 'CHAT', prompt });
 try { return JSON.parse(reply.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()); } 
 catch (e) { return null; }
}

export async function generateFlashcards(content, subject, topic) {
 const prompt = `From these notes on ${subject}: ${topic}, extract 8-12 key flashcards. Return ONLY a valid JSON array with "front" and "back".\nNotes: ${content.slice(0, 3000)}`;
 const reply = await callAIRouter({ task: 'CHAT', prompt });
 try { return JSON.parse(reply.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()); } 
 catch (e) { return null; }
}

export async function sendFeynmanMessage(topic, conversationHistory = []) {
 const historyText = conversationHistory.map(m => `${m.role}: ${m.text}`).join('\n');
 const prompt = `You are a confused student trying to understand "${topic}". Be curious, challenge vague explanations. Ask probing questions. Keep it short.\n\nConversation so far:\n${historyText}\nStudent:`;
 return await callAIRouter({ task: 'CHAT', prompt });
}

export async function scoreFeynmanSession(topic, exchanges) {
 const transcript = exchanges.map(e => `${e.role === 'user' ? 'Teacher' : 'Student'}: ${e.text}`).join('\n');
 const prompt = `Assess this teaching session on "${topic}". Return ONLY valid JSON with: "feynman_score" (0-100), "strong_concepts" (array), "weak_concepts" (array), "feedback".\nTranscript:\n${transcript}`;
 const reply = await callAIRouter({ task: 'CHAT', prompt });
 try { return JSON.parse(reply.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()); } 
 catch (e) { return { feynman_score: 50, strong_concepts: [], weak_concepts: [], feedback: "Assessment failed." }; }
}

export async function generateCramPlan(subject, weakTopics) {
 const prompt = `Create a cram plan for ${subject}. Weak topics: ${weakTopics.join(', ')}. Use markdown.`;
 return await callAIRouter({ task: 'CHAT', prompt });
}

export async function generateCheatSheet(subject, notesContent) {
 const prompt = `Compress these ${subject} notes into a single-page cheat sheet. Use bullets and formulas. Max 500 words.\nNotes: ${notesContent.slice(0, 6000)}`;
 return await callAIRouter({ task: 'CHAT', prompt });
}

// ---------------------------------------------------------
// v2.5 Feature Wrappers
// ---------------------------------------------------------

export async function analyzeMockTest(testData) {
 const prompt = `Analyze this mock test performance: ${JSON.stringify(testData)}. Identify weak areas, time management issues, and suggest a 3-day recovery plan.`;
 return await callAIRouter({ task: 'MOCK_ANALYSIS', prompt, context: { complexity: 'high' } });
}

export async function generateStudyPlan(studentProfile) {
 const prompt = `Generate a personalized study plan for ${studentProfile.examTarget}. Subjects: ${studentProfile.subjects.join(', ')}. Daily hours: ${studentProfile.dailyHours}. Target date: ${studentProfile.examDate}. Give week-by-week milestones.`;
 return await callAIRouter({ task: 'STUDY_PLAN', prompt });
}

export async function analyzePYQPatterns(subject, yearRange) {
 const prompt = `Analyze previous year question patterns for ${subject} from ${yearRange}. Which topics carry the highest weightage? What are the most repeated concepts?`;
 return await callAIRouter({ task: 'PYQ_PATTERN', prompt, context: { complexity: 'high', subject } });
}

export async function handleImageDoubt(promptText, imageBase64) {
 return await callAIRouter({ 
 task: 'DOUBT_IMAGE', 
 prompt: promptText || "Explain this image step by step.", 
 imageBase64 
 });
}

export async function generateFormulas(subject, chapter) {
 const prompt = `Generate a comprehensive list of all mathematical/scientific formulas for ${subject} - ${chapter}. Format beautifully with Markdown and LaTeX.`;
 return await callAIRouter({ task: 'FORMULA', prompt, context: { subject, chapter } });
}


