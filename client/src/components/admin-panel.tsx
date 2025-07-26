import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsertStudent } from "@shared/schema";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const FILIERES = [
  "Développement Web",
  "Data Science", 
  "Cybersécurité",
  "IA & Machine Learning",
  "DevOps",
  "Mobile Development"
];

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    matricule: "",
    filieres: [] as string[],
    photo: ""
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addStudentMutation = useMutation({
    mutationFn: async (studentData: InsertStudent) => {
      const response = await apiRequest("POST", "/api/students", studentData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Succès",
        description: "Étudiant ajouté avec succès !",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
      resetForm();
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFiliereToggle = (filiere: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      filieres: checked 
        ? [...prev.filieres, filiere]
        : prev.filieres.filter(f => f !== filiere)
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Erreur",
          description: "La photo ne doit pas dépasser 5MB",
          variant: "destructive",
        });
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Erreur", 
          description: "Veuillez sélectionner un fichier image (JPG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }
      
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPhotoPreview(result);
        setFormData(prev => ({ ...prev, photo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      nom: "",
      prenom: "",
      matricule: "",
      filieres: [],
      photo: ""
    });
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.prenom || !formData.matricule || formData.filieres.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const photoUrl = formData.photo || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400";

    addStudentMutation.mutate({
      ...formData,
      nom: formData.nom.toUpperCase(),
      matricule: formData.matricule.toUpperCase(),
      photo: photoUrl
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">Panel Administrateur</DialogTitle>
        <DialogDescription className="sr-only">
          Formulaire pour ajouter un nouvel étudiant au système
        </DialogDescription>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-orange">Panel Administrateur</h3>
              <p className="text-gray-400">Ajouter un nouvel étudiant</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-semibold text-gray-300 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Nom
              </Label>
              <Input
                value={formData.nom}
                onChange={(e) => handleInputChange("nom", e.target.value)}
                placeholder="Nom de famille"
                className="bg-dark-blue border-gray-600 text-white placeholder-gray-400 focus:border-cyan focus:ring-cyan/20"
                required
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-300 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Prénom
              </Label>
              <Input
                value={formData.prenom}
                onChange={(e) => handleInputChange("prenom", e.target.value)}
                placeholder="Prénom"
                className="bg-dark-blue border-gray-600 text-white placeholder-gray-400 focus:border-cyan focus:ring-cyan/20"
                required
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold text-gray-300 mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
              </svg>
              Numéro Matricule
            </Label>
            <Input
              value={formData.matricule}
              onChange={(e) => handleInputChange("matricule", e.target.value)}
              placeholder="Ex: FUT2025001"
              className="bg-dark-blue border-gray-600 text-white placeholder-gray-400 focus:border-cyan focus:ring-cyan/20"
              required
            />
          </div>

          <div>
            <Label className="text-sm font-semibold text-gray-300 mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
              </svg>
              Filière(s)
            </Label>
            <div className="grid grid-cols-2 gap-3 p-4 bg-dark-blue rounded-lg border border-gray-600">
              {FILIERES.map((filiere) => (
                <label key={filiere} className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={formData.filieres.includes(filiere)}
                    onCheckedChange={(checked) => handleFiliereToggle(filiere, !!checked)}
                    className="text-cyan bg-dark-blue border-gray-600"
                  />
                  <span className="text-sm text-white">{filiere}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold text-gray-300 mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 2l3 3 3-3c0-1.1-.9-2-2-2H11c-1.1 0-2 .9-2 2zm3 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm0-13c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
              </svg>
              Photo de l'étudiant
            </Label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-cyan transition-colors duration-300">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                id="photo-upload"
              />
              {photoPreview ? (
                <div className="mb-4">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-cyan"
                  />
                </div>
              ) : (
                <div>
                  <svg className="w-16 h-16 text-gray-400 mb-2 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                  </svg>
                  <p className="text-gray-400 mb-2">Cliquez pour sélectionner une photo</p>
                  <p className="text-xs text-gray-500">PNG, JPG jusqu'à 5MB</p>
                </div>
              )}
              <Button
                type="button"
                onClick={() => document.getElementById("photo-upload")?.click()}
                className="mt-4 bg-cyan hover:bg-cyan/80 text-dark-blue font-semibold"
              >
                Choisir une photo
              </Button>
            </div>
          </div>

          <div className="flex space-x-4 pt-6">
            <Button
              type="submit"
              disabled={addStudentMutation.isPending}
              className="flex-1 bg-cyan hover:bg-cyan/80 text-dark-blue font-bold py-4 transition-all duration-300"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              {addStudentMutation.isPending ? "Ajout en cours..." : "Ajouter l'étudiant"}
            </Button>
            <Button
              type="button"
              onClick={resetForm}
              variant="secondary"
              className="bg-gray-600 hover:bg-gray-500 text-white font-semibold px-8 py-4"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              </svg>
              Reset
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
