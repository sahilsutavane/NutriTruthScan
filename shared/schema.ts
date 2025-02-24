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
  size: text("size"),
  imageUrl: text("imageUrl"),
  ingredients: text("ingredients").array().notNull(),
  additives: text("additives").array(),
  analysis: jsonb("analysis").$type<{
    riskLevel: "low" | "medium" | "high";
    warnings: string[];
    goodIngredients: string[];
    badIngredients: string[];
    nutriScore: "A" | "B" | "C" | "D" | "E";
    novaScore: number;
    foodScore: number;
  }>().notNull(),
  nutrition: jsonb("nutrition").$type<{
    calories: number;
    carbohydrates: number;
    sugar: number;
    salt: number;
    sodium: number;
  }>(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  preferences: true,
});

export const insertProductSchema = createInsertSchema(products);

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;