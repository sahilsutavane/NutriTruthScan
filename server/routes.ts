import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertUserSchema } from "@shared/schema";
import { getProductDetailsFromGemini } from "./gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  // Products API
  app.get("/api/products", async (_req, res) => {
    const products = await storage.getAllProducts();
    res.json(products);
  });

  app.get("/api/products/barcode/:barcode", async (req, res) => {
    try {
      let product = await storage.getProductByBarcode(req.params.barcode);
      
      if (!product) {
        // Product not found in our database, return 404
        res.status(404).json({ message: "Product not found" });
        return;
      }
      
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      // Check if product already exists
      const existingProduct = await storage.getProductByBarcode(req.body.barcode);
      if (existingProduct) {
        // Return the existing product
        res.json(existingProduct);
        return;
      }
      
      // Validate the product data
      const parseResult = insertProductSchema.safeParse(req.body);
      if (!parseResult.success) {
        console.error("Invalid product data:", parseResult.error);
        res.status(400).json({ 
          message: "Invalid product data",
          errors: parseResult.error.errors
        });
        return;
      }
      
      // Create the product
      const product = await storage.createProduct(parseResult.data);
      res.json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  // User Preferences API
  app.post("/api/users", async (req, res) => {
    try {
      const parseResult = insertUserSchema.safeParse(req.body);
      if (!parseResult.success) {
        res.status(400).json({ message: "Invalid user data" });
        return;
      }
      const user = await storage.createUser(parseResult.data);
      res.json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.patch("/api/users/:id/preferences", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      
      const updatedUser = await storage.updateUserPreferences(userId, req.body.preferences);
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user preferences:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  // AI Analysis API - For future enhancement
  app.post("/api/analyze", async (req, res) => {
    try {
      // This route is a placeholder for future AI analysis features
      // It would use Gemini or other AI services to analyze product ingredients
      
      if (!req.body.productId && !req.body.barcode) {
        res.status(400).json({ message: "Product ID or barcode is required" });
        return;
      }
      
      // For now, just return a mock success response
      res.json({ 
        success: true, 
        message: "Analysis request received"
      });
    } catch (error) {
      console.error("Error in product analysis:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
