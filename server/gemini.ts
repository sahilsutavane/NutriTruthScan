
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function getProductDetailsFromGemini(barcode: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Please provide details about a product with barcode ${barcode}. Include: name, brand, category, and list of ingredients if applicable. Format as JSON.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Error getting product details from Gemini:', error);
    return null;
  }
}
