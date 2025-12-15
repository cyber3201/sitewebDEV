import { GoogleGenAI } from "@google/genai";
import { Course } from "../types";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getCourseRecommendation = async (
  query: string, 
  availableCourses: Course[]
): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Désolé, le service d'assistance est temporairement indisponible (Clé API manquante).";

  const courseContext = availableCourses.map(c => 
    `- ${c.title} (${c.category}, ${c.level}): ${c.description}`
  ).join('\n');

  const prompt = `
    Tu es un conseiller pédagogique expert pour l'école "Form'Campus".
    
    Voici la liste des formations disponibles :
    ${courseContext}

    L'utilisateur demande : "${query}"

    Réponds de manière concise, professionnelle et encourageante. Recommande la ou les formations les plus adaptées.
    Si aucune formation ne correspond parfaitement, suggère la plus proche.
    Utilise le vouvoiement.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text || "Je n'ai pas pu générer de réponse pour le moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Une erreur est survenue lors de l'analyse de votre demande.";
  }
};