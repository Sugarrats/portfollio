// Cette page présente le projet Android Studio (Java / SQLite)
// avec des liens vers les documents produits et le GitHub du projet

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import { Github, FileText, BookOpen, FlaskConical, ClipboardList, Database, Code } from "lucide-react";

export default function AndroidModal({ isOpen, onClose, title = "application mobile avec bd embarquée", children }) {
  const nodeRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const LiensAndroid = [
    {
      name: "github du projet",
      href: "https://github.com/Sugarrats/Projet-Android",
    },
    {
      name: "maquette",
      href: "/Maquette.pdf",
    },
    {
      name: "guide d'installation",
      href: "/Guide_d_installation.pdf",
    },
    {
      name: "MCD",
      href: "/MCD_Android.png",
    },
    {
      name: "tests unitaires",
      href: "/Test_unitaires.pdf",
    },
    {
      name: "cahier de recette",
      href: "/Cahier_de_recette_test_unitaires.pdf",
    },
    {
      name: "code du projet",
      href: "/Code_du_projet.pdf",
    },
  ];

  const getIcon = (name) => {
    if (name === "github du projet") return <Github size={40} />;
    if (name === "maquette") return <FileText size={40} />;
    if (name === "guide d'installation") return <BookOpen size={40} />;
    if (name === "MCD") return <Database size={40} />;
    if (name === "tests unitaires") return <FlaskConical size={40} />;
    if (name === "cahier de recette") return <ClipboardList size={40} />;
    if (name === "code du projet") return <Code size={40} />;
  };

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen || !isMounted) return null;

  const modalContent = (
    <div className="fixed inset-0 bg-background/50 pointer-events-none flex justify-center items-center z-[999999] p-4 sm:p-6">
      <Draggable nodeRef={nodeRef} disabled={isMobile} cancel="input,textarea,button,label">
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
              aria-label="Fermer la modale"
            >
              ✕
            </button>
          </div>

          {/* Infos Android */}
          <div className="px-4 py-2 space-y-2 text-primaire text-base">
            <p>
              Durant ma deuxième année de BTS j'ai développé une application mobile de{" "}
              <span className="text-secondaire font-bold">gestion de rendez-vous</span> pour le laboratoire GSB.
            </p>
            <p>
              Le projet a été réalisé en{" "}
              <span className="text-secondaire font-bold">Java</span> avec{" "}
              <span className="text-secondaire font-bold">Android Studio</span> et une base de données embarquée{" "}
              <span className="text-secondaire font-bold">SQLite</span>.
            </p>
            <p>
              L'application permet de gérer des{" "}
              <span className="text-secondaire font-bold">professionnels</span> et leurs{" "}
              <span className="text-secondaire font-bold">rendez-vous</span>, avec un planning par journée.
            </p>
          </div>

          {/* Body scrollable */}
          <section className="p-4 overflow-y-auto flex-1 flex flex-wrap justify-center gap-6">
            {children ??
              LiensAndroid.map((item) =>
                item.name === "github du projet" ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-center hover:text-secondaire transform transition duration-300 hover:scale-110"
                    aria-label={`Visiter ${item.name}`}
                  >
                    {getIcon(item.name)}
                    <span className="mt-2 text-sm font-bold">{item.name}</span>
                  </a>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => window.open(item.href, "_blank")}
                    className="flex flex-col items-center text-center hover:text-secondaire transform transition duration-300 hover:scale-110"
                    aria-label={`Ouvrir ${item.name}`}
                  >
                    {getIcon(item.name)}
                    <span className="mt-2 text-sm font-bold">{item.name}</span>
                  </button>
                )
              )}
          </section>
        </div>
      </Draggable>
    </div>
  );

  return createPortal(modalContent, document.body);
}