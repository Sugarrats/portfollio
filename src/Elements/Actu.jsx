import React, { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Files } from "lucide-react";
import Typewriter from "typewriter-effect";

export default function Modal({
  isOpen,
  onClose,
  title = "actualités",
  setIsStagesOpen,
  children,
}) {
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
          {/* header */}
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

          {/* body */}
          <section className="p-4 overflow-y-auto flex-1 flex flex-col items-center gap-4 min-h-[150px] text-center">
            <p className="text-left text-sm sm:text-base w-full max-w-full">
              <Typewriter
                options={{
                  strings: [
                    "ici vous pouvez voir un suivi de mes expériences professionnelles et de mes stages.",
                  ],
                  autoStart: true,
                  loop: false,
                  deleteSpeed: Infinity,
                  cursor: "_",
                }}
              />
            </p>

            {children ?? (
              <div className="flex flex-col items-center transform transition duration-300 hover:scale-104">
                <button
                  type="button"
                  onClick={() => setIsStagesOpen(true)}
                  className="p-2 bg-background text-primaire rounded-full transition duration-300 hover:scale-104"
                  aria-label="Ouvrir les détails du stage"
                >
                  <Files size={80} />
                </button>
                <span className="mt-2 text-sm font-bold text-center transition duration-300 hover:scale-104 max-w-xs">
                  stage à l&apos;IMFT
                </span>
              </div>
            )}
          </section>
        </div>
      </Draggable>
    </div>
  );
}
