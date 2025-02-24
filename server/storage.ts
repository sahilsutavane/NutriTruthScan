import { 
  users, products, 
  type User, type InsertUser,
  type Product, type InsertProduct 
} from "@shared/schema";

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private currentUserId: number;
  private currentProductId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;

    // Add some sample products
    this.initializeSampleProducts();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async updateUserPreferences(id: number, preferences: User['preferences']): Promise<User> {
    const user = await this.getUser(id);
    if (!user) throw new Error('User not found');
    
    const updatedUser = { ...user, preferences };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductByBarcode(barcode: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.barcode === barcode,
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  private initializeSampleProducts() {
    const sampleProducts: InsertProduct[] = [
      {
        barcode: "123456789",
        name: "Natural Moisturizer",
        brand: "PureBeauty",
        category: "Cosmetics",
        ingredients: ["Aqua", "Glycerin", "Aloe Vera", "Vitamin E"],
        analysis: {
          riskLevel: "low",
          warnings: [],
          goodIngredients: ["Aloe Vera", "Vitamin E"],
          badIngredients: []
        }
      },
      {
        barcode: "987654321",
        name: "Ultra Clean Shampoo",
        brand: "HairCare",
        category: "Cosmetics",
        ingredients: ["Aqua", "Sodium Laureth Sulfate", "Parfum", "Parabens"],
        analysis: {
          riskLevel: "medium",
          warnings: ["Contains Sulfates", "Contains Parabens"],
          goodIngredients: [],
          badIngredients: ["Sodium Laureth Sulfate", "Parabens"]
        }
      }
    ];

    sampleProducts.forEach(product => this.createProduct(product));
  }
}

export const storage = new MemStorage();
