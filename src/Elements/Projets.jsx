// Cette page va présenter mes projets réalisés durant ma formation.

import React, { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { FolderOpen } from "lucide-react";
import Typewriter from "typewriter-effect";

export default function Modal({
  isOpen,
  onClose,
  title = "projets",
  setIsWebBarOpen,
  setIsParcOpen,
  setIsVeilleOpen,
  setIsPrestaOpen,
  setIsDroitsOpen,
  setIsStagesOpen, 
  setIsGsbOpen,
  setIsAndroidOpen,
  setIsApiOpen,
  setIsAlternanceOpen,
  children,
}) {
  const nodeRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]); // multiple filters

  // ajouter touts les nouveaux projets ici
  // chaque projet est identifié avec un ou plusieurs tags
  const projects = [

    // bar a theme
    {
      tags: ["web"],
      title: "site d'un bar",
      onClick: () => setIsWebBarOpen(true),
      annee: "1ere année",
    },

    // parc informatique
    {
      tags: ["parc"],
      title: "gestion de parc",
      onClick: () => setIsParcOpen(true),
      annee: "1ere année",
    },

    // veille
    {
      tags: ["veille"],
      title: "veille informatique",
      onClick: () => setIsVeilleOpen(true),
      annee: "1ere année",
    },

    // presta
    {
      tags: ["web"],
      title: "boutique prestashop",
      onClick: () => setIsPrestaOpen(true),
      annee: "1ere année",
    },

    // droits linux
    {
      tags: ["parc"],
      title: "gestion de droits sur linux",
      onClick: () => setIsDroitsOpen(true),
      annee: "1ere année",
    },

    // stage 1er année 
    {
      tags: ["visual basic", "stage"],
      title: "application web de gestion interne",
      onClick: () => setIsStagesOpen(true),
      annee: "1ere année",
    },

    // Application de gestion de base de données avec c#
    {
      tags: ["c#"],
      title: "application de gestion de base de données",
      onClick: () => setIsGsbOpen(true),
      annee: "2iem année",
    },

    // application mobile avec android studio
    {
      tags: [
        "developpement mobile",
        "java",
        "base de donnée embarquées",
      ],
      title: "application mobile avec bd embarquée",
      onClick: () => setIsAndroidOpen(true),
      annee: "2iem année",
    },

    // application php utilisant des api avec la méthode agile
    {
      tags: [
        "developpement application",
        "php",
        "méthode de travail agile",
        "api"
      ],
      title: "application php utilisant des api.",
      onClick: () => setIsApiOpen(true),
      annee: "2iem année",
    },

    // projet alternance
    {
      tags: ["c#", "web", "alternance", "api"],
      title: "développement d'une application web de gestion interne",
      onClick: () => setIsAlternanceOpen(true),
      annee: "2iem année",
    },
  ];

  // Filtres par type de projet (tags) et par année
  const filters = [
    "all",
    ...new Set(projects.flatMap((p) => [...p.tags, p.annee])),
  ];

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
      setActiveFilters([]); //Selectione tout
    } else {

      setActiveFilters((prev) => // cherche les filtres actifs
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
    <div className="fixed inset-0 bg-background/50 pointer-events-none flex justify-center items-center z-[99999] p-4 sm:p-6">
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
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Filtres */}
          <div className="flex flex-col gap-2 px-4 py-2 border-b border-bordure bg-background">
            <div className="flex justify-center flex-wrap gap-2">
              {filters
                .filter((filter) => !filter.includes("année"))
                .map((filter) => (
                  <button
                    key={filter}
                    onClick={() => toggleFilter(filter)}
                    className={`px-3 py-1 rounded text-sm font-medium transition ${
                      isActive(filter)
                        ? "bg-primaire text-fenetre"
                        : "bg-bordure text-text"
                    }`}
                  >
                    {filter === "all" ? "tous" : filter}
                  </button>
                ))}
            </div>
            <div className="flex justify-center flex-wrap gap-2">
              {filters
                .filter((filter) => filter.includes("année"))
                .map((filter) => (
                  <button
                    key={filter}
                    onClick={() => toggleFilter(filter)}
                    className={`px-3 py-1 rounded text-sm font-medium transition ${
                      isActive(filter)
                        ? "bg-primaire text-fenetre"
                        : "bg-bordure text-text"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
            </div>
          </div>

          {/* Présentations des cprojets accomplis pendant ma formation */}
          <section className="p-4 overflow-y-auto flex-1 flex flex-col items-center gap-4 min-h-[150px] text-center">
            <p className="text-left text-sm sm:text-base w-full max-w-full">
              <Typewriter
                options={{
                  strings: [
                    "au cours de mon bts, j'ai réalisé plusieurs projets dans des domaines variés : <span class='text-secondaire font-bold'>développement web, applications, veille technologique, gestion de parc informatique...</span> vous pouvez découvrir l'intégralité de mes projets ici.",
                  ],
                  autoStart: true,
                  loop: false,
                  deleteSpeed: Infinity,
                  cursor: "_",
                  html: true,
                  delay: 20,
                }}
              />
            </p>

            {children ?? (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full`}
              >
                {/* Boucle sur les projets */}
                {projects
                  .filter((project) => {
                    if (activeFilters.length === 0) return true; // aucun filtre = tout afficher

                    const selectedYears = activeFilters.filter((f) => f.includes("année"));
                    const selectedTypes = activeFilters.filter((f) => !f.includes("année"));

                    const matchYear =
                      selectedYears.length === 0 || selectedYears.includes(project.annee);
                    const matchType =
                      selectedTypes.length === 0 || selectedTypes.some((t) => project.tags.includes(t));

                    return matchYear && matchType;
                  })
                  .map((project, index) => (
                    <div
                      key={`${project.tags.join(',')}-${index}`}
                      className="flex flex-col items-center"
                      data-project-id={project.tags.join(',')}
                    >
                      <button
                        type="button"
                        onClick={project.onClick}
                        className="p-2 bg-background text-primaire rounded-full transition duration-300 hover:scale-105"
                        aria-label={`Ouvrir les détails du projet ${project.title}`}
                      >
                        <FolderOpen size={80} />
                      </button>
                      <span className="mt-2 text-sm font-bold text-center transition duration-300 hover:scale-105 max-w-xs">
                        {project.title}
                      </span>
                      <span className="text-xs text-gray-500">{project.annee}</span>
                    </div>
                  ))}
              </div>
            )}
          </section>
        </div>
      </Draggable>
    </div>
  );
}
