// Cette page va présenter mon stage de fin d'étude, avec des liens vers le rapport de stage et le github du projet.

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import { Github, FileUser } from "lucide-react";

export default function StageModal({ isOpen, onClose, title = "stage imft", children }) {
  const nodeRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const LiensStage = [
    {
      name: "github du projet",
      href: "https://github.com/Sugarrats/StageIMFT",
    },
    {
      name: "rapport de stage",
      href: "/Rapport_de_stage.pdf",
    },
  ];

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
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Infos stage */}
          <div className="px-4 py-2 space-y-2 text-primaire text-base">
            <p>
              du 26 mai 2025 au 27 juin 2025, j'ai fait un stage à l'institut de mécanique des fluides de toulouse.
            </p>
            <p>
              la mission du stage était de développer une application de comptabilitée avec{" "}
              <span className="text-secondaire font-bold">visual basic.</span>
            </p>
          </div>

          {/* Body scrollable */}
          <section className="p-4 overflow-y-auto flex-1 flex justify-center space-x-8">
            {children ??
              LiensStage.map((item) =>
                item.name === "rapport de stage" ? (
                  <button
                    key={item.name}
                    onClick={() => window.open(item.href, "_blank")}
                    className="flex flex-col items-center text-center hover:text-secondaire transform transition duration-300 hover:scale-110"
                    aria-label={`Ouvrir ${item.name}`}
                  >
                    <FileUser size={40} />
                    <span className="mt-2 text-sm font-bold ">{item.name}</span>
                  </button>
                ) : (
                    <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-center hover:text-secondaire transform transition duration-300 hover:scale-110"
                    aria-label={`Visiter ${item.name}`}
                    >
                    {item.name === "github du projet" && <Github size={40} />}
                    <span className="mt-2 text-sm font-bold ">{item.name}</span>
                    </a>
                )
              )}
          </section>
        </div>
      </Draggable>
    </div>
  );

  return createPortal(modalContent, document.body);
}
