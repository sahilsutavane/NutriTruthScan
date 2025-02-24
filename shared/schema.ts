import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  preferences: jsonb("preferences").$type<{
    allergies: string[];
    concerns: string[];
  }>().default({ allergies: [], concerns: [] }),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  barcode: text("barcode").notNull().unique(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  category: text("category").notNull(),
  ingredients: text("ingredients").array().notNull(),
  analysis: jsonb("analysis").$type<{
    riskLevel: "low" | "medium" | "high";
    warnings: string[];
    goodIngredients: string[];
    badIngredients: string[];
  }>().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  preferences: true,
});

export const insertProductSchema = createInsertSchema(products).pick({
  barcode: true,
  name: true,
  brand: true,
  category: true,
  ingredients: true,
  analysis: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
