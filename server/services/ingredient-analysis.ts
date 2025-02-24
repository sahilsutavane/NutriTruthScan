import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../config";

const genAI = new GoogleGenerativeAI(config.apiKey);

export async function analyzeIngredients(ingredients: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Analyze these food ingredients and provide a JSON response with the following structure:
{
  "safety_score": number from 1-10,
  "allergens": array of common allergens found,
  "artificial": array of artificial ingredients,
  "concerns": array of health concerns,
  "benefits": array of health benefits
}

Ingredients: ${ingredients}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error analyzing ingredients:", error);
    return {
      safety_score: 5,
      allergens: [],
      artificial: [],
      concerns: ["Analysis failed"],
      benefits: []
    };
  }
}

//This file needs to be created in the ../config directory
//To resolve the original error
//This is a minimal example, replace with your actual configuration.
//Place this file in a directory named 'config' at the same level as the 'services' directory.
//The file should be named config.ts

//config.ts
//export const config = {
//  GOOGLE_API_KEY: "YOUR_GOOGLE_API_KEY" // Replace with your actual API key
//};