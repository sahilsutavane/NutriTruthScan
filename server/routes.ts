import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Products API
  app.get("/api/products", async (_req, res) => {
    const products = await storage.getAllProducts();
    res.json(products);
  });

  app.get("/api/products/barcode/:barcode", async (req, res) => {
    let product = await storage.getProductByBarcode(req.params.barcode);
    
    if (!product) {
      // Try getting product info from Gemini
      const geminiProduct = await getProductDetailsFromGemini(req.params.barcode);
      if (geminiProduct) {
        // Save the product to our database
        product = await storage.createProduct(geminiProduct);
      } else {
        res.status(404).json({ message: "Product not found" });
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
    const product = await storage.createProduct(parseResult.data);
    res.json(product);
  });

  // User Preferences API
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
