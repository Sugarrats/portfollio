// Cette page présente le projet LabGSB (C# / WinForms / MySQL)
// avec des liens vers les documents produits et le GitHub du projet

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import { Github, FileText, BookOpen, BarChart2, Database, GitBranch } from "lucide-react";

export default function LabGSBModal({ isOpen, onClose, title = "LabGSB — application de gestion d'incidents", children }) {
  const nodeRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const LiensLabGSB = [
    {
      name: "github du projet",
      href: "https://github.com/Sugarrats/LabGSB",
    },
    {
      name: "manuel d'utilisation",
      href: "/Manuel_d_utilisation.pdf",
    },
    {
      name: "diagramme de classe",
      href: "/Diagramme_de_classe_métier.pdf",
    },
    {
      name: "MCD",
      href: "/MCD.jpg",
    },
    {
      name: "MLD",
      href: "/MLD.png",
    },
    {
      name: "diagramme de Gantt",
      href: "/Gantt.pdf",
    },
  ];

  const getIcon = (name) => {
    if (name === "github du projet") return <Github size={40} />;
    if (name === "manuel d'utilisation") return <BookOpen size={40} />;
    if (name === "diagramme de classe") return <GitBranch size={40} />;
    if (name === "MCD") return <Database size={40} />;
    if (name === "MLD") return <FileText size={40} />;
    if (name === "diagramme de Gantt") return <BarChart2 size={40} />;
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

          {/* Infos LabGSB */}
          <div className="px-4 py-2 space-y-2 text-primaire text-base">
            <p>
              Durant ma deuxième année de BTS j'ai développé{" "}
              <span className="text-secondaire font-bold">LabGSB</span>, une application de gestion d'incidents informatiques pour un laboratoire pharmaceutique fictif.
            </p>
            <p>
              Le projet a été réalisé en{" "}
              <span className="text-secondaire font-bold">C# WinForms</span> avec une base de données{" "}
              <span className="text-secondaire font-bold">WampServer</span>, en équipe.
            </p>
            <p>
              L'application gère trois rôles distincts : <span className="text-secondaire font-bold">utilisateur</span>,{" "}
              <span className="text-secondaire font-bold">technicien</span> et{" "}
              <span className="text-secondaire font-bold">responsable</span>.
            </p>
          </div>

          {/* Body scrollable */}
          <section className="p-4 overflow-y-auto flex-1 flex flex-wrap justify-center gap-6">
            {children ??
              LiensLabGSB.map((item) =>
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