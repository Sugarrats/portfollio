import { Sun, Moon } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/librairie/outils";

export const ChangementTheme = () => {
    const [EstEnModeSombre, setEstEnModeSombre] = useState(false);

    useEffect(() => {
        const etatTheme = localStorage.getItem("theme");
        if (etatTheme === "sombre") {
            setEstEnModeSombre(true);
            document.documentElement.classList.add("sombre");
        } else {
            setEstEnModeSombre(false);
            document.documentElement.classList.add("clair");
        }
    }, []);

    const ThemeChanger = () => {
        if (EstEnModeSombre) {
            localStorage.setItem("theme", "clair");
            document.documentElement.classList.remove("sombre");
            document.documentElement.classList.add("clair");
            setEstEnModeSombre(false);
        } else {
            document.documentElement.classList.remove("clair");
            document.documentElement.classList.add("sombre");
            localStorage.setItem("theme", "sombre");
            setEstEnModeSombre(true);
        }
    };

    // Bouton de changement de thème
    return (
        <button onClick={ThemeChanger} className={cn(
            "fixed top-4 left-8 z-48 p-4 rounded-full transition-colors duration-300",
            "focus:outlin-hidden"
        )}>
            {EstEnModeSombre ? (
                <Moon className="h-8 w-8 text-primaire transform transition duration-300 hover:scale-125" />
            ) : (
                <Sun className="h-8 w-8 text-primaire transform transition duration-300 hover:scale-125" />
            )}
        </button>
    );
};
