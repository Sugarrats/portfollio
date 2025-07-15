import React, { useState } from 'react';
import { MessageCircleQuestionMark, FolderOpen, Link, Newspaper, Mail } from 'lucide-react';
import Typewriter from "typewriter-effect";
import CompetencesModal from "./Compétences"
import ProjetModal from "./Projets"
import LienModal from "./Lien";
import ActuModal from "./Actu"
import ContactModal from "./Contact";
import StageModal from './Stages';
import WebBarModal from './Bar';
import ParcModal from './Parc';
import VeillModal from './Veille';
import PrestaModal from './Presta'
import DroitsModal from './Droits'

export const Presentation = () => {

    // gestion de chaque modal à ouvrir

    const [isCompetencesOpen, setIsCompetencesOpen] = useState(false);
    const [isProjetsOpen, setIsProjetsOpen] = useState(false);
    const [isWebBarOpen, setIsWebBarOpen] = useState(false);
    const [isParcOpen, setIsParcOpen] = useState(false);
    const [isVeilleOpen, setIsVeilleOpen] = useState(false);
    const [isPrestaOpen, setIsPrestaOpen] = useState(false);
    const [isDroitsOpen, setIsDroitsOpen] = useState(false);
    const [isLienOpen, setIsLienOpen] = useState(false);
    const [isActuOpen, setIsActuOpen] = useState(false);
    const [isStagesOpen, setIsStagesOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto text-center z-10">
                <div className="w-full">
                    <div className="bg-fenetre border-2 border-bordure rounded-lg mx-auto overflow-hidden max-w-xl w-full">
                        {/* Barre de titre */}
                        <div className="bg-primaire text-fenetre p-4 flex justify-start w-full">
                            <h1 className="text-lg sm:text-xl font-semibold">accueil</h1>
                        </div>

                        {/* Titre principal */}
                        <div className="p-4 sm:p-6">
                            <h1 className="text-2xl sm:text-3xl font-bold">
                                <span className="text-primaire">bonjour! </span>
                                <span className="text-secondaire"> je suis adrien</span>
                            </h1>
                        </div>

                        {/* Typewriter */}
                        <div className="p-4 flex justify-center">
                            <h1 className="text-center flex flex-col sm:flex-row items-center gap-2 text-base sm:text-lg font-bold">
                                <span className="text-primaire">je suis </span>
                                <span className="text-secondaire">
                                    <Typewriter
                                        options={{
                                            strings: [
                                                "< développeur fullstack />",
                                                "< développeur d'application />",
                                                "< administrateur de bases de données />",
                                            ],
                                            autoStart: true,
                                            loop: true,
                                            cursor: '_',
                                        }}
                                    />
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="h-5"></div>

                <div className="p-4 flex justify-around items-center gap-4 flex-wrap">

                    <div className="flex flex-col items-center transform transition duration-300 hover:scale-105">
                        {/*Compétences*/}
                        <button
                            type='button'
                            onClick={() => setIsCompetencesOpen(true)}
                            className="p-2 bg-background text-primaire rounded-full transition duration-300 hover:scale-110"
                        >
                            <MessageCircleQuestionMark size={80} />
                        </button>
                        <span className="mt-2 text-sm font-bold text-center transition duration-300 hover:scale-110">
                            mes compétences
                        </span>
                    </div>

                    <div className="flex flex-col items-center transform transition duration-300 hover:scale-105">
                        {/*Projets*/}
                        <button
                            type='button'
                            onClick={() => setIsProjetsOpen(true)}
                            className="p-2 bg-background text-primaire rounded-full transition duration-300 hover:scale-110"
                        >
                            <FolderOpen size={80} />
                        </button>
                        <span className="mt-2 text-sm font-bold text-center transition duration-300 hover:scale-110">
                            mes projets
                        </span>
                    </div>

                    <div className="flex flex-col items-center transform transition duration-300 hover:scale-105">
                        {/*Liens*/}
                        <button
                            type="button"
                            onClick={() => setIsLienOpen(true)}
                            className="p-2 bg-background text-primaire rounded-full transition duration-300 hover:scale-110"
                        >
                            <Link size={80} />
                        </button>
                        <span className="mt-2 text-sm font-bold text-center transition duration-300 hover:scale-110">
                            mes liens
                        </span>
                    </div>

                    <div className="flex flex-col items-center transform transition duration-300 hover:scale-105">
                        {/*Expériences*/}
                        <button
                            type='button'
                            onClick={() => setIsActuOpen(true)}
                            className="p-2 bg-background text-primaire rounded-full transition duration-300 hover:scale-110"
                        >
                            <Newspaper size={80} />
                        </button>
                        <span className="mt-2 text-sm font-bold text-center transition duration-300 hover:scale-110">
                            mes expériences
                        </span>
                    </div>

                    <div className="flex flex-col items-center transform transition duration-300 hover:scale-105">
                        {/*Contact*/}
                        <button
                            type="button"
                            onClick={() => setIsContactOpen(true)}
                            className="p-2 bg-background text-primaire rounded-full transition duration-300 hover:scale-110"
                        >
                            <Mail size={80} />
                        </button>
                        <span className="mt-2 text-sm font-bold text-center transition duration-300 hover:scale-110">
                            mon contact
                        </span>
                    </div>
                </div>

                <div className="h-10"></div>
            </div>

            <CompetencesModal
                isOpen={isCompetencesOpen}
                onClose={() => setIsCompetencesOpen(false)}
            />

            <ProjetModal
                isOpen={isProjetsOpen}
                onClose={() => setIsProjetsOpen(false)}
                setIsWebBarOpen={setIsWebBarOpen}
                setIsPrestaOpen={setIsPrestaOpen}
                setIsParcOpen={setIsParcOpen}
                setIsVeilleOpen={setIsVeilleOpen}
                setIsDroitsOpen={setIsDroitsOpen}
            />

            <WebBarModal
                isOpen={isWebBarOpen}
                onClose={() => setIsWebBarOpen(false)}
            />

            <ParcModal
                isOpen={isParcOpen}
                onClose={() => setIsParcOpen(false)}
            />

            <VeillModal
                isOpen={isVeilleOpen}
                onClose={() => setIsVeilleOpen(false)}
            />

            <PrestaModal
                isOpen={isPrestaOpen}
                onClose={() => setIsPrestaOpen(false)}
            />

            <DroitsModal
                isOpen={isDroitsOpen}
                onClose={() => setIsDroitsOpen(false)}
            />

            <LienModal
                isOpen={isLienOpen}
                onClose={() => setIsLienOpen(false)}
            />

            <ActuModal
                isOpen={isActuOpen}
                onClose={() => setIsActuOpen(false)}
                setIsStagesOpen={setIsStagesOpen}
            />

            <StageModal
                isOpen={isStagesOpen}
                onClose={() => setIsStagesOpen(false)}
            />

            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
            />

        </section>
    );
};
