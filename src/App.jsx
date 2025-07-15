import React, { useState } from 'react';
import { Chargement } from './Elements/Chargement';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Accueil } from './pages/Accueil';
import { Erreur } from './pages/Erreur';


function App() {
  const [chargementFini, setChargementFini] = useState(false);

  return (
    <>

      {!chargementFini ? (
        <Chargement onComplete={() => setChargementFini(true)} />
      ) : 
      
      // Page d'accueil
      (
        <BrowserRouter>
          <Routes>
            <Route index element={<Accueil />} />
            <Route path="*" element={<Erreur />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
