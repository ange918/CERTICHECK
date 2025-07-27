import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { openDB } from "idb";

// Définition du type Student localement
interface Student {
  id: string;
  nom: string;
  prenom: string;
  matricule: string;
  filieres: string[];
  photo: string;
}

// Exemple de données initiales (lecture seule, ou à stocker dans localStorage)
const initialStudents: Student[] = [
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

// Initialisation de la base IndexedDB
async function getDB() {
  return openDB("FuturCertifyDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("students")) {
        const store = db.createObjectStore("students", { keyPath: "id" });
        store.createIndex("matricule", "matricule", { unique: true });
      }
    },
  });
}

// Charger tous les étudiants
async function getStudents(): Promise<Student[]> {
  const db = await getDB();
  return (await db.getAll("students")).length > 0
    ? await db.getAll("students")
    : initialStudents;
}

// Chercher un étudiant par matricule
async function findStudentByMatricule(matricule: string): Promise<Student | undefined> {
  const db = await getDB();
  const index = db.transaction("students").objectStore("students").index("matricule");
  return await index.get(matricule.toUpperCase());
}

// Ajouter un étudiant
async function addStudent(student: Student) {
  const db = await getDB();
  // Vérifier unicité
  const exists = await findStudentByMatricule(student.matricule);
  if (exists) throw new Error("Ce numéro matricule existe déjà");
  await db.add("students", student);
}

// Initialiser la base avec les étudiants initiaux si vide
async function seedInitialStudents() {
  const db = await getDB();
  const count = await db.count("students");
  if (count === 0) {
    for (const s of initialStudents) {
      await db.add("students", s);
    }
  }
}

export default function StudentSearch() {
  const [matricule, setMatricule] = useState("");
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    seedInitialStudents();
  }, []);

  const handleSearch = async () => {
    setError("");
    const found = await findStudentByMatricule(matricule);
    if (!found) {
      setStudent(null);
      setError("Étudiant non trouvé");
    } else {
      setStudent(found);
    }
  };

  return (
    <div style={{
      background: '#17223b',
      borderRadius: 12,
      padding: 32,
      maxWidth: 500,
      margin: '40px auto',
      boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
      border: '1px solid #233554',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <svg style={{ color: '#19f6fc', width: 28, height: 28, marginRight: 10 }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        <h2 style={{ color: '#19f6fc', fontWeight: 700, fontSize: 26, margin: 0 }}>Rechercher un Certificat</h2>
      </div>
      <div style={{ position: 'relative', width: '100%', marginBottom: 20 }}>
        <input
              type="text"
          value={matricule}
          onChange={e => setMatricule(e.target.value)}
              placeholder="Saisir le numéro matricule..."
          style={{
            width: '100%',
            padding: '14px 48px 14px 18px',
            borderRadius: 8,
            border: '1px solid #233554',
            background: '#202b44',
            color: '#fff',
            fontSize: 18,
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
        <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: '#19f6fc' }}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
        </span>
            </div>
      <button
            onClick={handleSearch}
        style={{
          width: '100%',
          padding: '14px 0',
          borderRadius: 8,
          background: '#19f6fc',
          color: '#17223b',
          fontWeight: 'bold',
          fontSize: 18,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
          boxShadow: '0 2px 8px rgba(25,246,252,0.08)'
        }}
      >
        <svg style={{ marginRight: 10 }} width="22" height="22" fill="none" stroke="#17223b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        Rechercher
      </button>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      {student && (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#f3f4f6', borderRadius: 16, padding: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', maxWidth: 400
        }}>
          <img src={student.photo} alt="photo" width={120} height={120} style={{ borderRadius: '50%', marginBottom: 16, border: '4px solid #06b6d4' }} />
          <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>{student.nom} {student.prenom}</h2>
          <p style={{ fontSize: 18, color: '#555', margin: '8px 0 0 0' }}>Matricule : <b>{student.matricule}</b></p>
          <p style={{ fontSize: 16, color: '#333', margin: '16px 0 0 0', textAlign: 'center' }}>
            Le nommé <b>{student.nom} {student.prenom}</b> a effectivement suivi une formation en <b>{student.filieres.join(', ')}</b> sur le programme Futur 2025.
          </p>
        </div>
      )}
    </div>
  );
}
