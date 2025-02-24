import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertUserSchema } from "@shared/schema";
import { analyzeIngredients } from "./services/ingredient-analysis";

export async function registerRoutes(app: Express): Promise<Server> {
  // Products API
  app.get("/api/products", async (_req, res) => {
    const products = await storage.getAllProducts();
    res.json(products);
  });

  app.get("/api/products/barcode/:barcode", async (req, res) => {
    let product = await storage.getProductByBarcode(req.params.barcode);

    if (!product) {
      try {
        // Try getting product info from OpenFoodFacts
        const openFoodFactsProduct = await searchProductByBarcode(req.params.barcode);
        if (openFoodFactsProduct) {
          // Analyze ingredients using AI
          const analysis = await analyzeIngredients(openFoodFactsProduct.ingredients);
          openFoodFactsProduct.analysis = analysis;

          // Save the product to our database
          product = await storage.createProduct(openFoodFactsProduct);
        } else {
          res.status(404).json({ message: "Product not found" });
          return;
        }
      } catch (error) {
        console.error('Error analyzing product:', error);
        res.status(500).json({ message: "Error analyzing product" });
        return;
      }
    }
    res.json(product);
  });

  app.post("/api/products", async (req, res) => {
    const parseResult = insertProductSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ message: "Invalid product data" });
      return;
    }

    try {
      // Analyze ingredients using AI before saving
      const analysis = await analyzeIngredients(parseResult.data.ingredients);
      const productWithAnalysis = {
        ...parseResult.data,
        analysis,
      };

      const product = await storage.createProduct(productWithAnalysis);
      res.json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: "Error creating product" });
    }
  });

  // User routes remain unchanged
  app.post("/api/users", async (req, res) => {
    const parseResult = insertUserSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ message: "Invalid user data" });
      return;
    }
    const user = await storage.createUser(parseResult.data);
    res.json(user);
  });

  app.patch("/api/users/:id/preferences", async (req, res) => {
    const userId = parseInt(req.params.id);
    const user = await storage.getUser(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const updatedUser = await storage.updateUserPreferences(userId, req.body.preferences);
    res.json(updatedUser);
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Placeholder function - needs implementation
async function searchProductByBarcode(barcode: string) {
  // Replace with actual OpenFoodFacts API call
  // ...Implementation to fetch product details from OpenFoodFacts using barcode...
  return null; //Or a valid product object
}