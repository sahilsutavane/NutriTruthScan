import { 
  users, products, 
  type User, type InsertUser,
  type Product, type InsertProduct 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPreferences(id: number, preferences: User['preferences']): Promise<User>;
  
  getProduct(id: number): Promise<Product | undefined>;
  getProductByBarcode(barcode: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  getAllProducts(): Promise<Product[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUserPreferences(id: number, preferences: User['preferences']): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ preferences })
      .where(eq(users.id, id))
      .returning();
    
    if (!user) throw new Error('User not found');
    return user;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getProductByBarcode(barcode: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.barcode, barcode));
    return product;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  // Method to initialize sample data in the database
  async initializeSampleProducts() {
    const existingProducts = await this.getAllProducts();
    
    // Only initialize if we don't have products yet
    if (existingProducts.length === 0) {
      const sampleProducts: InsertProduct[] = [
        {
          barcode: "123456789",
          name: "Natural Moisturizer",
          brand: "PureBeauty",
          category: "Cosmetics",
          size: "250ml",
          imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3",
          ingredients: ["Aqua", "Glycerin", "Aloe Vera", "Vitamin E", "Shea Butter", "Sunflower Oil"],
          additives: [],
          nutrition: null,
          analysis: {
            riskLevel: "low",
            warnings: [],
            goodIngredients: ["Aloe Vera", "Vitamin E", "Shea Butter"],
            badIngredients: [],
            nutriScore: "A",
            novaScore: 1,
            foodScore: 95
          }
        },
        {
          barcode: "987654321",
          name: "Ultra Clean Shampoo",
          brand: "HairCare",
          category: "Cosmetics",
          size: "350ml",
          imageUrl: "https://images.unsplash.com/photo-1594761340686-b206936f80cb?q=80&w=2902&auto=format&fit=crop&ixlib=rb-4.0.3",
          ingredients: ["Aqua", "Sodium Laureth Sulfate", "Parfum", "Parabens", "Cocamidopropyl Betaine"],
          additives: ["E218", "E219"],
          nutrition: null,
          analysis: {
            riskLevel: "medium",
            warnings: ["Contains Sulfates", "Contains Parabens", "Contains additive E218", "Contains additive E219"],
            goodIngredients: [],
            badIngredients: ["Sodium Laureth Sulfate", "Parabens"],
            nutriScore: "C",
            novaScore: 3,
            foodScore: 50
          }
        },
        {
          barcode: "5449000000996",
          name: "Coca-Cola Classic",
          brand: "Coca-Cola",
          category: "Beverages",
          size: "330ml",
          imageUrl: "https://images.openfoodfacts.org/images/products/544/900/000/0996/front_en.348.400.jpg",
          ingredients: ["Carbonated Water", "High Fructose Corn Syrup", "Caramel Color", "Phosphoric Acid", "Natural Flavors", "Caffeine"],
          additives: ["E150d", "E338"],
          nutrition: {
            calories: 139,
            carbohydrates: 35,
            sugar: 35,
            salt: 0,
            sodium: 0.02
          },
          analysis: {
            riskLevel: "high",
            warnings: ["High sugar content", "Contains additive E150d", "Contains additive E338", "Contains caffeine"],
            goodIngredients: [],
            badIngredients: ["High Fructose Corn Syrup", "Phosphoric Acid"],
            nutriScore: "E",
            novaScore: 4,
            foodScore: 10
          }
        }
      ];

      // Insert sample products one by one
      for (const product of sampleProducts) {
        try {
          await this.createProduct(product);
          console.log(`Sample product created: ${product.name}`);
        } catch (error) {
          console.error(`Error creating sample product: ${product.name}`, error);
        }
      }
    }
  }
}

// Create storage instance
export const storage = new DatabaseStorage();
