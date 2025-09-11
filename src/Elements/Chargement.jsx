// Cette page affiche une animation de chargement avec une barre de progression et un effet de machine à écrire.

import { useEffect, useState } from "react";

export const Chargement = ({ onComplete }) => {
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0); // État pour la progression de la barre de chargement
  const TexteComplet = "<bienvenue sur mon portfollio />";

  // Animation du texte
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(TexteComplet.substring(0, index));
      index++;

      // Mise à jour de la progression de la barre de chargement
      const newProgress = (index / TexteComplet.length) * 100;
      setProgress(newProgress);

      // Arrêt si on a fini le texte
      if (index > TexteComplet.length) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-background text-primaire flex flex-col items-center justify-center">
      {/* Texte avec effet de machine à écrire */}
      <div className="mb-4 text-4xl font-mono font-bold">
        {text} <span className="animate-clignote ml-1">|</span>
      </div>

      {/* Barre de chargement*/}
      <div className="w-[200px] h-[5px] bg-gray-800 overflow-hidden mx-auto">
        <div
          className="h-full bg-yellow-500 shadow-[0_0_15px_#FEFEE6] barre-de-chargement"
          style={{ width: `${progress}%` }} // Utilisation de la progression pour définir la largeur
        ></div>
      </div>
    </div>
  );
};
