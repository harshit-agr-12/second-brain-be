import { GoogleGenAI } from "@google/genai";
import {config} from "../config/env";

const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });

export async function queryGemini(query:string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: query,
  });
  return response.text;
}
