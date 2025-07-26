import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStudentSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Search student by matricule
  app.get("/api/students/search/:matricule", async (req, res) => {
    try {
      const { matricule } = req.params;
      const student = await storage.getStudentByMatricule(matricule);
      
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      
      res.json(student);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Add new student
  app.post("/api/students", async (req, res) => {
    try {
      const validatedData = insertStudentSchema.parse(req.body);
      
      // Check if matricule already exists
      const existingStudent = await storage.getStudentByMatricule(validatedData.matricule);
      if (existingStudent) {
        return res.status(400).json({ message: "Ce numéro matricule existe déjà" });
      }
      
      const student = await storage.createStudent(validatedData);
      res.status(201).json(student);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Get all students (for admin)
  app.get("/api/students", async (req, res) => {
    try {
      const students = await storage.getAllStudents();
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
