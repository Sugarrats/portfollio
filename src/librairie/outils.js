// Ce code va permettre d'utiliser les fonctions de tailwind merge facilement 
// A réutiliser dés que j'utilise tailwind

import {clsx} from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) =>
{
    return twMerge(clsx(inputs));
};