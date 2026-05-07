// Cette page va présenter mes compétences avec des filtres pour chaque compétence

import React, { useRef, useEffect, useState, useCallback } from "react";
import Draggable from "react-draggable";
import Typewriter from "typewriter-effect";

// Les 6 compétences du BTS SIO (colonnes C→H du tableau E5)
const COMPETENCES = [
  { id: "C", label: "gérer le patrimoine informatique" },
  { id: "D", label: "répondre aux incidents et demandes d'assistance" },
  { id: "E", label: "développer la présence en ligne" },
  { id: "F", label: "travailler en mode projet" },
  { id: "G", label: "mettre à disposition un service informatique" },
  { id: "H", label: "organiser son développement professionnel" },
];

export default function ModalCompétences({
  isOpen,
  onClose,
  title = "compétences",
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
}) {
  const nodeRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  // Resize
  const [size, setSize] = useState({ width: 900, height: 600 });
  const isResizing = useRef(false);
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onMouseDownResize = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    isResizing.current = true;
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      w: size.width,
      h: size.height,
    };

    const onMouseMove = (e) => {
      if (!isResizing.current) return;
      const newW = Math.max(400, resizeStart.current.w + (e.clientX - resizeStart.current.x));
      const newH = Math.max(300, resizeStart.current.h + (e.clientY - resizeStart.current.y));
      setSize({ width: newW, height: newH });
    };

    const onMouseUp = () => {
      isResizing.current = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }, [size]);

  if (!isOpen) return null;

  const realisations = [
    {
      titre: "site d'un bar (html, css, bootstrap, php, javascript)",
      periode: "01/09/2024 - 26/05/2025",
      onClick: () => setIsWebBarOpen(true),
      competences: { C: false, D: false, E: true, F: false, G: true, H: false },
    },
    {
      titre: "portfolio personnel",
      periode: "27/06/2025 - 14/04/2026",
      onClick: null,
      competences: { C: false, D: false, E: false, F: false, G: false, H: true },
    },
    {
      titre: "gestion de droits utilisateurs avec linux",
      periode: "23/11/2024 - 20/12/2024",
      onClick: () => setIsDroitsOpen(true),
      competences: { C: true, D: false, E: false, F: false, G: false, H: false },
    },
    {
      titre: "suivi des incidents avec GLPI",
      periode: "03/03/2025 - 07/03/2026",
      onClick: () => setIsParcOpen(true),
      competences: { C: true, D: true, E: false, F: false, G: false, H: false },
    },
    {
      titre: "site e-commerce prestashop",
      periode: "01/04/2025 - 01/05/2026",
      onClick: () => setIsPrestaOpen(true),
      competences: { C: true, D: true, E: true, F: true, G: false, H: false },
    },
    {
      titre: "application c# de gestion d'incidents (LabGSB)",
      periode: "01/11/2025 - 31/12/2025",
      onClick: () => setIsGsbOpen(true),
      competences: { C: true, D: true, E: false, F: true, G: true, H: false },
    },
    {
      titre: "application android avec bd sqlite",
      periode: "15/12/2025 - 12/01/2026",
      onClick: () => setIsAndroidOpen(true),
      competences: { C: false, D: true, E: false, F: false, G: true, H: false },
    },
    {
      titre: "api php/json + application php (méthode agile)",
      periode: "12/03/2026 - 02/04/2026",
      onClick: () => setIsApiOpen(true),
      competences: { C: false, D: false, E: false, F: true, G: true, H: false },
    },
    {
      titre: "veille technologique (langage zig)",
      periode: "2025 - 2026",
      onClick: () => setIsVeilleOpen(true),
      competences: { C: false, D: false, E: false, F: false, G: false, H: true },
    },
    {
      titre: "stage imft — macros excel en visual basic",
      periode: "26/05/2025 - 27/06/2025",
      onClick: () => setIsStagesOpen(true),
      competences: { C: false, D: true, E: false, F: true, G: true, H: true },
    },
    {
      titre: "alternance drafpica — application web c# (api yparéo)",
      periode: "03/11/2025 - 30/06/2026",
      onClick: () => setIsAlternanceOpen(true),
      competences: { C: false, D: true, E: false, F: true, G: true, H: true },
    },
  ];

  const filtered = activeFilter
    ? realisations.filter((r) => r.competences[activeFilter])
    : realisations;

  return (
    <div className="fixed inset-0 bg-background/50 pointer-events-none flex justify-center items-center z-[99999] p-4 sm:p-6 lowercase">
      <Draggable
        nodeRef={nodeRef}
        disabled={isMobile}
        cancel="input,textarea,button,label,.resize-handle"
      >
        <div
          ref={nodeRef}
          style={{
            width: isMobile ? "95vw" : size.width,
            height: isMobile ? "90vh" : size.height,
            maxWidth: "98vw",
            maxHeight: "95vh",
            position: "relative",
          }}
          className="bg-background border-2 border-bordure rounded-lg shadow-lg pointer-events-auto flex flex-col overflow-hidden"
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

          {/* Filtres par compétence */}
          <div className="flex justify-center flex-wrap gap-2 px-4 py-2 border-b border-bordure bg-background flex-shrink-0">
            <button
              onClick={() => setActiveFilter(null)}
              className={`px-3 py-1 rounded text-sm font-medium transition ${
                activeFilter === null ? "bg-primaire text-fenetre" : "bg-bordure text-text"
              }`}
            >
              toutes
            </button>
            {COMPETENCES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveFilter(activeFilter === c.id ? null : c.id)}
                className={`px-3 py-1 rounded text-sm font-medium transition ${
                  activeFilter === c.id ? "bg-primaire text-fenetre" : "bg-bordure text-text"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Corps scrollable */}
          <section className="p-4 overflow-y-auto flex-1 flex flex-col gap-4 min-h-0">
            <p className="text-left text-sm sm:text-base w-full flex-shrink-0">
              <Typewriter
                options={{
                  strings: [
                    "voici mes <span class='text-secondaire font-bold'>réalisations professionnelles</span> et les compétences associées. cliquez sur une réalisation pour ouvrir le projet.",
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

            {/* Tableau */}
            <div className="overflow-auto w-full flex-1">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr>
                    <th className="border border-bordure px-2 py-1 text-left bg-primaire text-fenetre font-semibold min-w-[180px]">
                      réalisation
                    </th>
                    <th className="border border-bordure px-2 py-1 text-left bg-primaire text-fenetre font-semibold min-w-[110px]">
                      période
                    </th>
                    {COMPETENCES.map((c) => (
                      <th
                        key={c.id}
                        className={`border border-bordure px-2 py-1 text-center font-semibold min-w-[80px] transition ${
                          activeFilter === c.id
                            ? "bg-secondaire text-fenetre"
                            : "bg-primaire text-fenetre"
                        }`}
                        title={c.label}
                      >
                        {c.label.split(" ").slice(0, 2).join(" ")}…
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr
                      key={i}
                      onClick={r.onClick ?? undefined}
                      className={`transition ${i % 2 === 0 ? "bg-background" : "bg-bordure/20"} ${
                        r.onClick ? "cursor-pointer hover:bg-primaire/10" : ""
                      }`}
                    >
                      <td className="border border-bordure px-2 py-2">
                        <span className={`font-medium ${r.onClick ? "underline underline-offset-2" : ""}`}>
                          {r.titre}
                        </span>
                        {r.onClick && (
                          <span className="ml-1 text-[10px] px-1 rounded bg-primaire text-fenetre">
                            projet
                          </span>
                        )}
                      </td>
                      <td className="border border-bordure px-2 py-2 text-center whitespace-nowrap">
                        {r.periode}
                      </td>
                      {COMPETENCES.map((c) => (
                        <td
                          key={c.id}
                          className={`border border-bordure px-2 py-2 text-center ${
                            r.competences[c.id] ? "bg-secondaire/30" : ""
                          }`}
                        >
                          {r.competences[c.id] ? (
                            <span className="text-secondaire font-bold">✓</span>
                          ) : (
                            <span className="text-bordure">–</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-sm text-gray-400 mt-4">
                aucune réalisation pour cette compétence.
              </p>
            )}
          </section>

          {/* Poignée de redimensionnement (coin bas droite) */}
          {!isMobile && (
            <div
              className="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
              onMouseDown={onMouseDownResize}
              style={{
                background: "linear-gradient(135deg, transparent 50%, var(--color-bordure, #888) 50%)",
              }}
            />
          )}
        </div>
      </Draggable>
    </div>
  );
}