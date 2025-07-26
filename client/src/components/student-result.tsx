import type { Student } from "@shared/schema";

interface StudentResultProps {
  student: Student;
}

export function StudentResult({ student }: StudentResultProps) {
  const filieresText = student.filieres.length > 1 
    ? student.filieres.slice(0, -1).join(", ") + " et " + student.filieres[student.filieres.length - 1]
    : student.filieres[0];

  return (
    <div id="results-section" className="max-w-4xl mx-auto mb-16">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <img 
              src={student.photo} 
              alt={`${student.prenom} ${student.nom}`}
              className="w-32 h-32 rounded-full object-cover border-4 border-cyan shadow-lg mx-auto"
            />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-4 border-dark-blue">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-2">{student.prenom} {student.nom}</h3>
              <p className="text-cyan font-semibold text-lg">Matricule: {student.matricule}</p>
            </div>
            
            <div className="bg-dark-blue rounded-xl p-6 border border-gray-600">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                    <path d="M10 14l-2-2 1.41-1.41L10 11.17l4.59-4.58L16 8l-6 6z"/>
                  </svg>
                </div>
              </div>
              <h4 className="text-xl font-semibold text-green-400 text-center mb-4">
                <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Certificat Authentifié
              </h4>
              <div className="text-center">
                <p className="text-gray-300 leading-relaxed text-lg">
                  Le nommé <strong className="text-white">{student.prenom} {student.nom}</strong> a effectivement suivi une formation en 
                  <strong className="text-cyan"> {filieresText}</strong> sur le Programme FUTUR en 2025.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-cyan" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                  </svg>
                  <div>
                    <p className="text-sm text-gray-400">Formation(s)</p>
                    <p className="font-semibold text-white">{student.filieres.join(", ")}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-cyan" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                  <div>
                    <p className="text-sm text-gray-400">Année</p>
                    <p className="font-semibold text-white">2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
