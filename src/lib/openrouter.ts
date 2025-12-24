import { OpenRouter } from "@openrouter/sdk";

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
- [GitHub](https://github.com/Yansokchan)
- [LinkedIn](https://www.linkedin.com/in/sokchan-yan-74277b335)
- [Instagram](https://www.instagram.com/lichantong/)
- [Telegram](https://t.me/Sokchan_YAN)
- [Facebook](https://www.facebook.com/lichantong)

When answering questions:
1. Be conversational and friendly
2. If asked about something not in the profile, politely say you don't have that information
3. Encourage visitors to reach out via the contact form for more details
4. Keep responses concise but informative
5. You can suggest they check specific sections of the portfolio for more details
6. IMPORTANT: Always format links as Markdown, especially for social media (e.g., [Facebook](https://facebook.com/example)). Do not output raw URLs.`;

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

// Initialize the OpenRouter client
let client: OpenRouter | null = null;

function getClient(): OpenRouter {
  if (!client) {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error(
        "OpenRouter API key not found. Please add VITE_OPENROUTER_API_KEY to your .env file."
      );
    }
    client = new OpenRouter({ apiKey });
  }
  return client;
}

export async function sendMessageToOpenRouter(
  messages: ChatMessage[]
): Promise<string> {
  try {
    const openrouter = getClient();

    // Prepend system prompt to the messages
    const fullMessages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...messages,
    ];

    const model = "xiaomi/mimo-v2-flash:free";

    // Use the streaming interface as requested, but we'll collect it all for now
    // since the current UI expects a full promise resolution.
    // If we wanted real streaming UI we'd need to refactor the hook/component more deeply.
    const stream = await openrouter.chat.send({
      model: model,
      messages: fullMessages,
      stream: true,
      streamOptions: {
        includeUsage: true,
      },
    });

    let response = "";
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        response += content;
      }
      // Usage info is ignored for now as we just return text
    }

    if (!response) {
      throw new Error("Empty response from OpenRouter API");
    }

    return response;
  } catch (error) {
    console.error("OpenRouter API error:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to communicate with OpenRouter API");
  }
}
