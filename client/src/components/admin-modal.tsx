import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (success: boolean) => void;
}

export function AdminModal({ isOpen, onClose, onLogin }: AdminModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (password === "FUTUR2025") {
      setError(false);
      setPassword("");
      onLogin(true);
    } else {
      setError(true);
      setPassword("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleClose = () => {
    setPassword("");
    setError(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-800 border-gray-700 max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-orange rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-orange">Accès Administrateur</h3>
          <p className="text-gray-400 mt-2">Saisissez le mot de passe pour continuer</p>
        </div>
        
        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Mot de passe..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-dark-blue border-gray-600 text-white placeholder-gray-400 focus:border-orange focus:ring-orange/20"
            autoFocus
          />
          
          <div className="flex space-x-3">
            <Button 
              onClick={handleLogin}
              className="flex-1 bg-orange hover:bg-orange/80 text-white font-semibold"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
              </svg>
              Connexion
            </Button>
            <Button 
              onClick={handleClose}
              variant="secondary"
              className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-semibold"
            >
              Annuler
            </Button>
          </div>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
            <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
            </svg>
            Mot de passe incorrect
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
