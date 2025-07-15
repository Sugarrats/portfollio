import { ChangementTheme } from "../Elements/ChangementTheme"
import { Presentation } from "../Elements/presentation"
import { Footer } from "../Elements/footer"
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