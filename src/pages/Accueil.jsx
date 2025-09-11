// Cette page est la page d'accueil du portfolio, intégrant les différents éléments comme le changement de thème, la présentation et le footer.

import { ChangementTheme } from "../Elements/ChangementTheme"
import { Presentation } from "../Elements/Presentation"
import { Footer } from "../Elements/Footer"
import { Vague } from "../Elements/Vague"

export const Accueil = () => {
    return (
    <div className="min-h-screen bg-background text-primaire overflow-x-hidden">

        {/*Changement entre mode sombre et mode clair*/}
            <ChangementTheme />
    
        {/*Bouton pour activer ou pas le son*/}

        {/*Contenu principal*/}
        <main>
            <Presentation />
        </main>

        {/*Effet de vague pas sur*/}
           {/*<Vague />*/} 

        {/*Footer*/}
            <Footer />

    </div>
    )
}