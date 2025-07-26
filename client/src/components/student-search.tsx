import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Student } from "@shared/schema";

interface StudentSearchProps {
  onSearchResult: (student: Student | null, error: string | null) => void;
}

export function StudentSearch({ onSearchResult }: StudentSearchProps) {
  const [matricule, setMatricule] = useState("");

  const searchMutation = useMutation({
    mutationFn: async (matricule: string) => {
      const response = await apiRequest("GET", `/api/students/search/${encodeURIComponent(matricule)}`);
      return response.json();
    },
    onSuccess: (student: Student) => {
      onSearchResult(student, null);
      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    },
    onError: (error: Error) => {
      onSearchResult(null, error.message);
      setTimeout(() => {
        document.getElementById("no-results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    },
  });

  const handleSearch = () => {
    const trimmedMatricule = matricule.trim();
    if (!trimmedMatricule) {
      alert("Veuillez saisir un numéro matricule");
      return;
    }
    searchMutation.mutate(trimmedMatricule);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-16">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
        <h3 className="text-2xl font-semibold text-center mb-6 text-cyan">
          <svg className="w-6 h-6 inline mr-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          Rechercher un Certificat
        </h3>
        <div className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Saisir le numéro matricule..."
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-6 py-4 bg-dark-blue border border-gray-600 text-white placeholder-gray-400 focus:border-cyan focus:ring-cyan/20 pr-12"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
              </svg>
            </div>
          </div>
          <Button
            onClick={handleSearch}
            disabled={searchMutation.isPending}
            className="w-full bg-cyan hover:bg-cyan/80 text-dark-blue font-bold py-4 transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            {searchMutation.isPending ? "Recherche en cours..." : "Rechercher"}
          </Button>
        </div>
      </div>
    </div>
  );
}
