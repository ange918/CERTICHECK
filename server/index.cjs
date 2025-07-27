const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const DATA_FILE = path.join(__dirname, 'students.json');

app.use(cors());
app.use(express.json());

// GET: récupérer tous les étudiants
app.get('/api/students', (req, res) => {
  const data = fs.existsSync(DATA_FILE) ? JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) : [];
  res.json(data);
});

// POST: ajouter un étudiant
app.post('/api/students', (req, res) => {
  const newStudent = req.body;
  let data = [];
  if (fs.existsSync(DATA_FILE)) {
    data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  }
  // Vérifier unicité du matricule
  if (data.some(s => s.matricule === newStudent.matricule)) {
    return res.status(400).json({ message: "Ce numéro matricule existe déjà" });
  }
  newStudent.id = Date.now().toString();
  data.push(newStudent);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.status(201).json(newStudent);
});

// DELETE: supprimer un étudiant
app.delete('/api/students/:id', (req, res) => {
  let data = [];
  if (fs.existsSync(DATA_FILE)) {
    data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  }
  const newData = data.filter(s => s.id !== req.params.id);
  fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2));
  res.status(204).end();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
}); 