import React, { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { FileUser } from "lucide-react";

export default function Modal({ isOpen, onClose, title = "gestion de parc", children }) {
  const nodeRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

    const LiensBar = [
  
      // Compte rendu
      {
        name: "compte rendu gestion de parc",
        href: "/GLPI.pdf",
      },
  
    ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // mobile < 768px
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          className="
            bg-background border-2 border-bordure rounded-lg shadow-lg
            max-w-md w-full sm:max-w-lg md:w-2/5
            pointer-events-auto
            flex flex-col
            overflow-hidden
          "
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
              aria-label="Fermer la fenêtre modal"
            >
              ✕
            </button>
          </div>

          {/* Infos parc */}
          <div className="px-4 py-2 space-y-2 text-primaire text-base text-left">
            <p>
              pendant ma formation j'ai appris la gestion d'un parc informatique pour une entreprise.
            </p>
            <p>
              pour celà j'ai utilisé l'application {" "}
              <span className="text-secondaire font-bold">GLPI.</span>
            </p>
          </div>

          {/* Body scrollable */}
          <section className="p-4 overflow-y-auto flex-1 flex justify-center space-x-8">
            {children ??
              LiensBar.map((item) =>
               (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-center hover:text-secondaire transform transition duration-300 hover:scale-110"
                    aria-label={`Visiter ${item.name}`}
                  >
                    <FileUser size={40} />
                    <span className="mt-2 text-sm font-bold">{item.name}</span>
                  </a>
                )
              )}
          </section>
        </div>
      </Draggable>
    </div>
  );
}
