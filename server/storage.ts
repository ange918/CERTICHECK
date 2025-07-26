import { type User, type InsertUser, type Student, type InsertStudent } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getStudent(id: string): Promise<Student | undefined>;
  getStudentByMatricule(matricule: string): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  getAllStudents(): Promise<Student[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private students: Map<string, Student>;

  constructor() {
    this.users = new Map();
    this.students = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize with some sample students
    const sampleStudents: Student[] = [
      {
        id: "1",
        nom: "DUBOIS",
        prenom: "Marie",
        matricule: "FUT2025001",
        filieres: ["Développement Web", "Data Science"],
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        id: "2",
        nom: "MARTIN",
        prenom: "Pierre",
        matricule: "FUT2025002",
        filieres: ["Cybersécurité"],
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        id: "3",
        nom: "BERNARD",
        prenom: "Sophie",
        matricule: "FUT2025003",
        filieres: ["IA & Machine Learning", "Data Science"],
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      }
    ];

    sampleStudents.forEach(student => {
      this.students.set(student.id, student);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getStudent(id: string): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async getStudentByMatricule(matricule: string): Promise<Student | undefined> {
    return Array.from(this.students.values()).find(
      (student) => student.matricule.toLowerCase() === matricule.toLowerCase(),
    );
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = randomUUID();
    const student: Student = { ...insertStudent, id };
    this.students.set(id, student);
    return student;
  }

  async getAllStudents(): Promise<Student[]> {
    return Array.from(this.students.values());
  }
}

export const storage = new MemStorage();
