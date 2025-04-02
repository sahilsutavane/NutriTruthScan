import type { Product } from "@shared/schema";

const API_BASE_URL = "https://world.openfoodfacts.org/api/v0";

// Utility function to get risk level based on product data
function calculateRiskLevel(data: any): "low" | "medium" | "high" {
  if (!data) return "medium";
  
  // Use nutrition grade as a baseline
  const nutriGrade = data.nutrition_grade_fr || '';
  
  if (nutriGrade === 'a' || nutriGrade === 'b') return "low";
  if (nutriGrade === 'c') return "medium";
  return "high";  // d or e
}

// Extract e-numbers/additives from ingredients
function extractAdditives(data: any): string[] {
  const additives: string[] = [];
  
  // Direct additives from API if available
  if (data.additives_tags && Array.isArray(data.additives_tags)) {
    data.additives_tags.forEach((additive: string) => {
      // Clean up the format (e.g., "en:e100" -> "E100")
      const match = additive.match(/e(\d+[a-z]?)/i);
      if (match) {
        additives.push(`E${match[1]}`.toUpperCase());
      }
    });
  }
  
  return additives;
}

// Calculate scores based on available data
function calculateScores(data: any): { 
  nutriScore: "A" | "B" | "C" | "D" | "E",
  novaScore: number, 
  foodScore: number 
} {
  // Default values
  let nutriScore: "A" | "B" | "C" | "D" | "E" = "C";
  let novaScore = 3;
  let foodScore = 50;
  
  // Convert nutrition grade to our format (a -> A, etc.)
  if (data.nutrition_grade_fr) {
    const grade = data.nutrition_grade_fr.toUpperCase();
    if (['A', 'B', 'C', 'D', 'E'].includes(grade)) {
      nutriScore = grade as "A" | "B" | "C" | "D" | "E";
    }
  }
  
  // NOVA score directly from API (1-4)
  if (data.nova_group && data.nova_group >= 1 && data.nova_group <= 4) {
    novaScore = data.nova_group;
  }
  
  // Calculate food score (inverse of nutrition score A=100, E=0)
  const scoreMapping: Record<string, number> = {
    'A': 100,
    'B': 75,
    'C': 50,
    'D': 25,
    'E': 0
  };
  
  foodScore = scoreMapping[nutriScore] || 50;
  
  return { nutriScore, novaScore, foodScore };
}

// Extract nutrition data
function extractNutrition(data: any): Record<string, number> | undefined {
  if (!data.nutriments) return undefined;
  
  const nutriments = data.nutriments;
  
  return {
    calories: parseFloat(nutriments.energy_value || nutriments['energy-kcal_100g'] || 0),
    carbohydrates: parseFloat(nutriments.carbohydrates_100g || 0),
    sugar: parseFloat(nutriments.sugars_100g || 0),
    salt: parseFloat(nutriments.salt_100g || 0),
    sodium: parseFloat(nutriments.sodium_100g || 0)
  };
}

export async function searchProductByBarcode(barcode: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/product/${barcode}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    if (!data.product) {
      return null;
    }

    const product = data.product;
    
    // Extract ingredients as an array
    let ingredients: string[] = [];
    if (product.ingredients_text) {
      ingredients = product.ingredients_text.split(',').map((i: string) => i.trim());
    }
    
    // Extract additives
    const additives = extractAdditives(product);
    
    // Calculate scores
    const scores = calculateScores(product);
    
    // Extract nutrition information
    const nutrition = extractNutrition(product);
    
    // Get product image URL
    let imageUrl: string | null = null;
    if (product.image_url) {
      imageUrl = product.image_url;
    } else if (product.image_front_url) {
      imageUrl = product.image_front_url;
    } else if (product.image_front_small_url) {
      imageUrl = product.image_front_small_url;
    }
    
    // Get product size
    const size = product.quantity || null;
    
    // Analyze good and bad ingredients (simplified approach)
    const badIngredients = additives;
    const goodIngredients = ingredients.filter(i => 
      i.toLowerCase().includes('vitamin') || 
      i.toLowerCase().includes('protein') ||
      i.toLowerCase().includes('fiber')
    );
    
    // Convert nutrition to match our schema
    const formattedNutrition = nutrition ? {
      calories: nutrition.calories || 0,
      carbohydrates: nutrition.carbohydrates || 0,
      sugar: nutrition.sugar || 0,
      salt: nutrition.salt || 0,
      sodium: nutrition.sodium || 0
    } : null;
    
    // Map Open Food Facts data to our product schema
    return {
      id: 0, // This will be set by the backend
      barcode: barcode,
      name: product.product_name || "Unknown Product",
      brand: product.brands || "Unknown Brand",
      category: product.categories_tags?.[0] || "Other",
      size,
      imageUrl,
      ingredients,
      additives,
      nutrition: formattedNutrition,
      analysis: {
        riskLevel: calculateRiskLevel(product),
        warnings: additives.map(a => `Contains additive ${a}`),
        goodIngredients,
        badIngredients,
        ...scores
      }
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
