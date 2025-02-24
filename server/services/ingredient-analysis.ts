import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

interface IngredientAnalysis {
  score: number; // 0-100
  riskLevel: "low" | "medium" | "high";
  warnings: string[];
  goodIngredients: string[];
  badIngredients: string[];
  nutriScore: "A" | "B" | "C" | "D" | "E";
  novaScore: number;
  foodScore: number;
}

export async function analyzeIngredients(ingredients: string[]): Promise<IngredientAnalysis> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Analyze these food/cosmetic ingredients and provide a detailed safety assessment:

Ingredients: ${ingredients.join(", ")}

Provide a JSON response with:
1. safety_score (0-100)
2. risk_level ("low", "medium", "high")
3. warnings (array of specific concerns)
4. good_ingredients (array of beneficial ingredients)
5. bad_ingredients (array of harmful ingredients)
6. nutri_score (A-E)
7. nova_score (1-4)
8. food_score (0-100)

Focus on known allergens, harmful additives, and controversial ingredients.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = JSON.parse(response.text());

    return {
      score: analysis.safety_score,
      riskLevel: analysis.risk_level,
      warnings: analysis.warnings,
      goodIngredients: analysis.good_ingredients,
      badIngredients: analysis.bad_ingredients,
      nutriScore: analysis.nutri_score,
      novaScore: analysis.nova_score,
      foodScore: analysis.food_score,
    };
  } catch (error) {
    console.error('Error analyzing ingredients:', error);
    // Return a default safe analysis if AI fails
    return {
      score: 50,
      riskLevel: "medium",
      warnings: ["Unable to perform detailed analysis"],
      goodIngredients: [],
      badIngredients: [],
      nutriScore: "C",
      novaScore: 2,
      foodScore: 50,
    };
  }
}