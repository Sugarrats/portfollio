import React, { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { FolderOpen } from "lucide-react";
import Typewriter from "typewriter-effect";

export default function ModalCompétences({ isOpen, onClose, title = "compétences" }) {
  const nodeRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]); // filtres actifs

  // Liste des compétences
  const compétences = [

    // Développement logiciel
    { id: "développement", title: "c#", description: "développement d’applications orientées objet." },
    { id: "développement", title: "c++", description: "programmation bas-niveau et logiciels performants." },
    { id: "développement", title: "visual basic", description: "création d’outils et automatisations pour excel." },
    { id: "développement", title: "python", description: "scripts et prototypes rapides." },

    // Systèmes et réseaux
    { id: "systèmes", title: "commandes de base linux", description: "gestion du système et des fichiers." },
    { id: "systèmes", title: "gestion de droits linux", description: "permissions utilisateurs et sécurité." },
    { id: "systèmes", title: "installation de machines virtuelles", description: "déploiement d’environnements isolés." },

    // Bases de données
    { id: "bases de données", title: "requêtes sql", description: "interrogation et gestion des données." },
    { id: "bases de données", title: "gestion de bases de données", description: " administration des systèmes de gestion de bases relationnelles." },

    // Gestion IT
    { id: " gestion it", title: "glpi", description: "gestion de parc informatique et tickets de support." },
  ];

  // Filtres
  const filters = ["all", ...new Set(compétences.map((c) => c.id))];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleFilter = (filter) => {
    if (filter === "all") {
      setActiveFilters([]); // désactive tous les filtres
    } else {
      setActiveFilters((prev) =>
        prev.includes(filter)
          ? prev.filter((f) => f !== filter)
          : [...prev, filter]
      );
    }
  };

  const isActive = (filter) => {
    return filter === "all" ? activeFilters.length === 0 : activeFilters.includes(filter);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/50 pointer-events-none flex justify-center items-center z-[99999] p-4 sm:p-6 lowercase">
      <Draggable
        nodeRef={nodeRef}
        disabled={isMobile}
        cancel="input,textarea,button,label"
      >
        <div
          ref={nodeRef}
          style={{ maxHeight: "80vh" }}
          className={`
            bg-background border-2 border-bordure rounded-lg shadow-lg 
            pointer-events-auto flex flex-col
            w-full ${isMobile ? "max-w-[95%]" : "max-w-lg sm:max-w-xl md:w-1/2"}
            overflow-hidden
          `}
        >
          {/* Header */}
          <div
            className={`modal-header flex justify-between items-center px-4 py-2 ${
              isMobile ? "bg-bordure" : "bg-bordure cursor-move"
            } bg-primaire text-fenetre w-full flex-shrink-0`}
          >
            <h2 className="text-lg font-semibold truncate">{title}</h2>
            <button
              onClick={onClose}
              className="text-fenetre text-xl font-bold focus:outline-none"
              type="button"
              aria-label="fermer la modale"
            >
              ✕
            </button>
          </div>

          {/* Filtres */}
          <div className="flex justify-center flex-wrap gap-2 px-4 py-2 border-b border-bordure bg-background">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-3 py-1 rounded text-sm font-medium transition ${
                  isActive(filter)
                    ? "bg-primaire text-fenetre"
                    : "bg-bordure text-text"
                }`}
              >
                {filter === "all" ? "toutes" : filter}
              </button>
            ))}
          </div>

          {/* Body */}
          <section className="p-4 overflow-y-auto flex-1 flex flex-col items-center gap-4 min-h-[150px] text-center">
            <p className="text-left text-sm sm:text-base w-full max-w-full">
              <Typewriter
                options={{
                  strings: [
                    "voici une sélection de mes <span class='text-secondaire font-bold'>compétences</span> utiles pour mon projet d'orientation en <span class='text-secondaire font-bold'>licence pro APSIO.</span>",
                  ],
                  autoStart: true,
                  loop: false,
                  deleteSpeed: Infinity,
                  cursor: "_",
                  html: true,
                }}
              />
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {compétences
                .filter((c) =>
                  activeFilters.length === 0 || activeFilters.includes(c.id)
                )
                .map((c, index) => (
                  <div
                    key={`${c.id}-${index}`}
                    className="p-3 rounded-lg border border-bordure bg-background shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1"
                  >
                    <h3 className="font-semibold text-base text-secondaire mb-1">
                      {c.title}
                    </h3>
                    <p className="text-sm sm:text-base">{c.description}</p>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </Draggable>
    </div>
  );
}
