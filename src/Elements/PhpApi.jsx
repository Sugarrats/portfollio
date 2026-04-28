// Cette page va présenter mon projet php 
// avec des liens vers les documents produits
// et vers le github du projet

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import { Github, FileUser } from "lucide-react";

export default function PhpApi({ isOpen, onClose, title = "application php utilisant des api", children }) {
  const nodeRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const LiensApi = [
    {
      name: "github du projet",
      href: "https://github.com/Skymx82/ProjetApi",
    },
    {
      name: "compte rendu",
      href: "/Compte_rendu_PHP_API.pdf",
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

          {/* Infos PHP API */}
          <div className="px-4 py-2 space-y-2 text-primaire text-base">
            <p>
             durant ma deuxiéme année de bts j'ai du développé une application de gestion en php utilisant des API
            </p>
            <p>
              ce travail c'est fait en équipe en utilisant la méthode de travail{" "}<span className="text-secondaire font-bold">agile.</span>
            </p>
            <p>et le modéle de développement{" "} <span className="text-secondaire font-bold">mvc.</span>
            </p>
          </div>

          {/* Body scrollable */}
          <section className="p-4 overflow-y-auto flex-1 flex justify-center space-x-8">
            {children ??
              LiensApi.map((item) =>
                item.name === "compte rendu" ? (
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
