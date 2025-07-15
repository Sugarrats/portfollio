import React, { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import Typewriter from "typewriter-effect";
import { Linkedin, Github, FileUser } from "lucide-react";

const LiensItems = [
  {
    name: "linkedin",
    href: "https://www.linkedin.com/in/adrien-marc-chazarenc-523a42335/",
  },
  {
    name: "github",
    href: "https://github.com/Sugarrats",
  },
  {
    name: "cv",
    href: "/CV_DEV.pdf",
  },
];

export default function Modal({ isOpen, onClose, title = "liens", children }) {
  const nodeRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
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
          className={`
            bg-background border-2 border-bordure rounded-lg shadow-lg 
            pointer-events-auto flex flex-col
            w-full max-w-md
            sm:max-w-lg
            md:w-2/5
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

          {/* Body */}
          <section className="p-4 overflow-y-auto flex-1 flex flex-col gap-4 min-h-[150px]">
            <p className="text-left text-sm sm:text-base">
              <Typewriter
                options={{
                  strings: [
                    "suivez moi sur mes réseaux pour voir mes projets et mon évolution",
                  ],
                  autoStart: true,
                  loop: false,
                  deleteSpeed: Infinity,
                  cursor: "_",
                }}
              />
            </p>
            <div className="flex justify-center gap-8 flex-wrap">
              {children ??
                LiensItems.map((item) =>
                  item.name === "cv" ? (
                    <button
                      key={item.name}
                      onClick={() => window.open(item.href, "_blank")}
                      className="flex flex-col items-center text-center hover:text-secondaire transform transition duration-300 hover:scale-110"
                      aria-label={`Ouvrir ${item.name}`}
                    >
                      <FileUser size={40} />
                      <span className="mt-2 text-sm font-bold">{item.name}</span>
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
                      {item.name === "linkedin" ? (
                        <Linkedin size={40} />
                      ) : (
                        <Github size={40} />
                      )}
                      <span className="mt-2 text-sm font-bold">{item.name}</span>
                    </a>
                  )
                )}
            </div>
          </section>
        </div>
      </Draggable>
    </div>
  );
}
