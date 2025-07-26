export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-cyan rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-dark-blue" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M10 14l-2-2 1.41-1.41L10 11.17l4.59-4.58L16 8l-6 6z"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-cyan">PROGRAMME FUTUR</h4>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Plateforme officielle d'authentification des certificats délivrés par le Programme FUTUR. 
              Certification professionnelle reconnue dans le domaine des technologies digitales.
            </p>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Contact</h5>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>contact@programmefutur.org</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>Paris, France</span>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Liens Utiles</h5>
            <div className="space-y-2 text-sm">
              <a href="#" className="text-gray-400 hover:text-cyan transition-colors duration-300 block">
                <svg className="w-3 h-3 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
                À propos du programme
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan transition-colors duration-300 block">
                <svg className="w-3 h-3 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
                Nos formations
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan transition-colors duration-300 block">
                <svg className="w-3 h-3 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
                Conditions d'utilisation
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan transition-colors duration-300 block">
                <svg className="w-3 h-3 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Programme FUTUR. Tous droits réservés. | Développé avec passion pour l'éducation digitale
          </p>
        </div>
      </div>
    </footer>
  );
}
