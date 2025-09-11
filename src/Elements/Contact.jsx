// Cette page va permettre à l'utilisateur de me contacter via un formulaire sécurisé.

import React, { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Mailbox } from "lucide-react";
import DOMPurify from "dompurify";

export default function ContactModal({ isOpen, onClose }) {
  const nodeRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [lastSubmit, setLastSubmit] = useState(0); // anti-spam rapide

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen) return null;

  const sanitizeInput = (value) => {
    // Supprime tous les tags HTML potentiels
    return DOMPurify.sanitize(value.trim(), { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  };

  const validateInput = (data) => {
    if (
      !data.name ||
      data.name.length > 50 ||
      !/^[A-Za-zÀ-ÿ '\-]+$/.test(data.name)
    ) {
      return false;
    }
    if (
      !data.email ||
      data.email.length > 100 ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)
    ) {
      return false;
    }
    if (
      !data.message ||
      data.message.length > 1000 ||
      /<script|<\/script/i.test(data.message)
    ) {
      return false;
    }
    return true; // valid
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const now = Date.now();
    if (now - lastSubmit < 10 * 1000) {
      setSuccessMessage("un peu de patience vous devez attendre quelques secondes avant de renvoyer un message");
      return;
    }

    const formData = new FormData(event.target);
    const sanitizedData = {
      name: sanitizeInput(formData.get("name")),
      email: sanitizeInput(formData.get("email")).toLowerCase(),
      message: sanitizeInput(formData.get("message")),
    };

    if (!validateInput(sanitizedData)) {
      setSuccessMessage(":( une erreur est survenue dans les données du formulaire.");
      return;
    }

    const lastSentKey = `lastSent-${sanitizedData.email}`;
    const lastSent = localStorage.getItem(lastSentKey);

    if (lastSent && now - parseInt(lastSent, 10) < 5 * 60 * 1000) {
      const remainingTime = Math.ceil(
        (5 * 60 * 1000 - (now - parseInt(lastSent, 10))) / 1000
      );
      setSuccessMessage(
        `un peu de patience vous devez attendre ${Math.floor(
          remainingTime / 60
        )} min ${remainingTime % 60}s avant de renvoyer un message avec cette adresse email`
      );
      return;
    }

    sanitizedData.access_key = "e72db399-2c6c-42cb-bc0d-fb231b6c817c"; 

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(sanitizedData),
      }).then((res) => res.json());
      console.log(res);

      if (res.success) {
        setSuccessMessage(
          ":) j'ai bien reçu votre message ! je vous réponds dès que possible."
        );
        event.target.reset();
        localStorage.setItem(lastSentKey, now.toString());
        setLastSubmit(now);

        setTimeout(() => {
          setSuccessMessage("");
          onClose();
        }, 5000);
      } else {
        setSuccessMessage(
          ":( le formulaire ne s'est pas envoyé ! pas grave, vous pouvez réessayer."
        );
      }
    } catch (error) {
      setSuccessMessage(
        ":( le formulaire ne s'est pas envoyé mais ce n'est pas votre faute ! réessayez plus tard."
      );
    }
  };

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
            <h2 className="text-lg font-semibold truncate">contact</h2>
            <button
              onClick={onClose}
              className="text-fenetre text-xl font-bold focus:outline-none"
              type="button"
              aria-label="Fermer la fenêtre de contact"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <section className="p-4 overflow-y-auto flex-1">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-4 items-start">
                {/* Nom */}
                <label htmlFor="name" className="font-medium text-right sm:text-left mt-1">
                  votre nom :
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  maxLength={50}
                  pattern="^[A-Za-zÀ-ÿ '\\-]+$"
                  placeholder="entrez votre nom"
                  className="field border rounded p-2 w-full focus:outline-none focus:ring focus:border-blue-400 mt-1"
                />

                {/* Email */}
                <label htmlFor="email" className="font-medium text-right sm:text-left mt-1">
                  votre mail :
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  maxLength={100}
                  placeholder="entrez votre adresse mail"
                  className="field border rounded p-2 w-full focus:outline-none focus:ring focus:border-blue-400 mt-1"
                />

                {/* Message */}
                <label htmlFor="message" className="font-medium text-right sm:text-left mt-1">
                  votre message :
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={1000}
                  rows={4}
                  placeholder="entrez votre message"
                  className="border rounded p-2 w-full focus:outline-none focus:ring focus:border-blue-400 mt-1 resize-y"
                />
              </div>

              {/* Bouton */}
              <div className="flex flex-col items-center transform transition duration-300 hover:scale-103 mt-4">
                <button
                  type="submit"
                  className="p-2 bg-background text-primaire rounded-full transition duration-300 hover:scale-103"
                  aria-label="Envoyer le message"
                >
                  <Mailbox size={40} />
                </button>
                <span className="mt-2 text-sm font-bold text-center transition duration-300 hover:scale-103">
                  envoyer votre message
                </span>
              </div>

              {successMessage && (
                <p className="text-center mt-4 text-green-600 font-semibold animate-pulse">
                  {successMessage}
                </p>
              )}
            </form>
          </section>
        </div>
      </Draggable>
    </div>
  );
}
