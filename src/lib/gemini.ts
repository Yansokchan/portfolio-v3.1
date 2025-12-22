// Gemini API service module - Using official @google/genai SDK
import { GoogleGenAI } from "@google/genai";

// System prompt with Sokchan's profile information
const SYSTEM_PROMPT = `You are an AI assistant for Sokchan Yan's portfolio website. You should answer questions about Sokchan in a friendly, professional, and helpful manner. Here is Sokchan's profile information:

**Personal Information:**
- Name: Sokchan Yan
- Location: Phnom Penh, Cambodia
- Education: Third-year Computer Science student at the Royal University of Phnom Penh (RUPP)

**Current Role:**
- Pre-Sales Network & Security Engineer (since 2024)
- Over 1 year of experience designing and presenting enterprise security solutions
- Works with leading vendors: Palo Alto Networks, Cisco, and Fortinet
- Handles end-to-end network and security solutions including hardware, software, and cloud infrastructure

**Technical Skills:**
- Network Security: Cisco, Palo Alto, Fortinet, Network Consulting
- Web Development: React.js, Next.js, TypeScript, Node.js, Tailwind CSS, Supabase
- Certifications: CCNA, Fortinet Certified Fundamentals & Associate in Cybersecurity, Cisco Black Belt certifications, and more

**Passion:**
- Building modern web applications that look great and provide secure, meaningful solutions
- Bridging the gap between complex security solutions and business needs
- Continuous learning in network and security technology

**Social Links:**
- GitHub: https://github.com/Yansokchan
- LinkedIn: https://www.linkedin.com/in/sokchan-yan-74277b335
- Instagram: https://www.instagram.com/lichantong/

When answering questions:
1. Be conversational and friendly
2. If asked about something not in the profile, politely say you don't have that information
3. Encourage visitors to reach out via the contact form for more details
4. Keep responses concise but informative
5. You can suggest they check specific sections of the portfolio for more details`;

interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export interface ChatHistory {
  messages: ChatMessage[];
}

// Initialize the Gemini client
let ai: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!ai) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file."
      );
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

export async function sendMessageToGemini(
  userMessage: string,
  chatHistory: ChatHistory
): Promise<string> {
  try {
    const genAI = getAI();

    // Build conversation context
    const conversationContext = chatHistory.messages
      .map(
        (msg) =>
          `${msg.role === "user" ? "User" : "Assistant"}: ${msg.parts[0].text}`
      )
      .join("\n");

    const fullPrompt = conversationContext
      ? `${conversationContext}\nUser: ${userMessage}`
      : userMessage;

    // Use the new API format with gemini-2.0-flash-001
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const text = response.text;

    if (!text) {
      throw new Error("Empty response from Gemini API");
    }

    return text;
  } catch (error) {
    console.error("Gemini API error:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to communicate with Gemini API");
  }
}

export type { ChatMessage as GeminiMessage };
