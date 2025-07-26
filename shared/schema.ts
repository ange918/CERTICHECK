import { sql } from "drizzle-orm";
import { pgTable, text, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const students = pgTable("students", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nom: text("nom").notNull(),
  prenom: text("prenom").notNull(),
  matricule: text("matricule").notNull().unique(),
  filieres: json("filieres").$type<string[]>().notNull(),
  photo: text("photo").notNull(),
});

export const insertStudentSchema = createInsertSchema(students).pick({
  nom: true,
  prenom: true,
  matricule: true,
  filieres: true,
  photo: true,
});

export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Student = typeof students.$inferSelect;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
