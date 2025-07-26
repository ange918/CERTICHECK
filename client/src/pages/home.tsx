import { useState } from "react";
import { AdminModal } from "@/components/admin-modal";
import { AdminPanel } from "@/components/admin-panel";
import { StudentSearch } from "@/components/student-search";
import { StudentResult } from "@/components/student-result";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { Student } from "@shared/schema";

export default function Home() {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [searchResult, setSearchResult] = useState<Student | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleAdminLogin = (success: boolean) => {
    if (success) {
      setShowAdminModal(false);
      setShowAdminPanel(true);
    }
  };

  const handleSearchResult = (student: Student | null, error: string | null) => {
    setSearchResult(student);
    setSearchError(error);
  };

  return (
    <div className="min-h-screen bg-dark-blue text-white font-montserrat">
      {/* Header */}
      <header className="bg-dark-blue border-b border-gray-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-cyan rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-dark-blue" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M10 14l-2-2 1.41-1.41L10 11.17l4.59-4.58L16 8l-6 6z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-cyan">PROGRAMME FUTUR</h1>
                <p className="text-sm text-gray-300">Authentification des Certificats</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowAdminModal(true)}
              className="bg-orange hover:bg-orange/80 px-6 py-2 font-semibold transition-all duration-300 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L21 6v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V6l9-5z"/>
                <path d="M12 7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              <span>Admin</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan to-blue-400 bg-clip-text text-transparent">
            PROGRAMME FUTUR
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Plateforme d'authentification des certificats délivrés par le Programme FUTUR. 
            Vérifiez l'authenticité de votre certificat en saisissant votre numéro matricule.
          </p>
        </div>

        {/* Search Section */}
        <StudentSearch onSearchResult={handleSearchResult} />

        {/* Results Section */}
        {searchResult && <StudentResult student={searchResult} />}
        
        {/* No Results Message */}
        {searchError && (
          <div className="text-center py-12">
            <div className="text-6xl text-gray-600 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">Certificat non trouvé</h3>
            <p className="text-gray-500">Aucun certificat ne correspond à ce numéro matricule.</p>
          </div>
        )}
      </main>

      <Footer />

      {/* Modals */}
      <AdminModal 
        isOpen={showAdminModal} 
        onClose={() => setShowAdminModal(false)}
        onLogin={handleAdminLogin}
      />

      <AdminPanel 
        isOpen={showAdminPanel} 
        onClose={() => setShowAdminPanel(false)}
      />
    </div>
  );
}
