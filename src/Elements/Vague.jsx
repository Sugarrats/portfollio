// Cette page affiche une vague animée en bas de l'écran, avec une couleur qui s'adapte au thème actuel (clair ou sombre).

import React, { useEffect, useState } from 'react';
import Wave from 'react-wavify';
import '../index.css'; // Deux points car on remonte

export const Vague = () => {
  const [vagueColor, setVagueColor] = useState('#64a7f4');

  useEffect(() => {
    const updateVagueColor = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const color = rootStyles.getPropertyValue('--vague').trim();
      setVagueColor(color || '#64a7f4');
    };

    updateVagueColor();

    const observer = new MutationObserver(updateVagueColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%', height: '80px'  }}>
      <Wave
        fill={vagueColor}
        paused={false}
        style={{ display: 'flex' }}
        options={{
          height: 15,
          amplitude: 40,
          speed: 1,
          points: 7
        }}
      />
    </div>
  );
};

export default Vague;
