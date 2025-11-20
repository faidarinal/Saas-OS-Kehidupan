import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_PROMPT_TEXT } from "../types";

let chatSession: Chat | null = null;

const getAI = () => {
  if (!process.env.API_KEY) return null;
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const initializeChatSession = () => {
  const ai = getAI();
  if (!ai) return null;
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_PROMPT_TEXT,
      temperature: 0.7,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    const session = initializeChatSession();
    if (!session) {
      return "Maaf, sistem sedang offline (API Key tidak ditemukan).";
    }
  }

  try {
    const result = await chatSession!.sendMessage({ message });
    return result.text || "Maaf, saya tidak dapat menghasilkan respon saat ini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Mohon maaf, ada kendala koneksi sesaat. Silakan coba lagi ya, InsyaAllah lancar.";
  }
};

// Function to generate Syar'i compliant images
export const generateIslamicImage = async (prompt: string): Promise<string | null> => {
  const ai = getAI();
  if (!ai) return null;

  // Enforce Syar'i constraints in the prompt
  const safetyModifier = "Faceless, no human faces detailed, modest clothing covering aurat, islamic compliant, aesthetic, high quality, 8k resolution, cinematic lighting. ";
  const finalPrompt = safetyModifier + prompt;

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: finalPrompt,
      config: {
        numberOfImages: 1,
        aspectRatio: '1:1',
        outputMimeType: 'image/jpeg'
      },
    });

    const base64ImageBytes = response.generatedImages?.[0]?.image?.imageBytes;
    if (base64ImageBytes) {
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};

export const resetChatSession = () => {
  chatSession = null;
};