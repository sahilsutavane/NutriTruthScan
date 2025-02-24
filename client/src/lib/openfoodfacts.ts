import type { Product } from "@shared/schema";

const API_BASE_URL = "https://world.openfoodfacts.org/api/v2";

export async function searchProductByBarcode(barcode: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/product/${barcode}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    if (!data.product) {
      return null;
    }

    // Map Open Food Facts data to our product schema
    return {
      id: 0, // This will be set by the backend
      barcode: barcode,
      name: data.product.product_name || "Unknown Product",
      brand: data.product.brands || "Unknown Brand",
      category: data.product.categories_tags?.[0] || "Other",
      ingredients: data.product.ingredients_text_en?.split(',').map((i: string) => i.trim()) || [],
      analysis: {
        riskLevel: "low", // We'll need to implement proper analysis
        warnings: [],
        goodIngredients: [],
        badIngredients: []
      }
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
