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
          amplitude: 50,
          speed: 20,
          points: 4
        }}
      />
    </div>
  );
};

export default Vague;
