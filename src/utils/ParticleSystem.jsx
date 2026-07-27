import React, { useEffect, useState } from 'react';

export function useParticles() {
  const [particles, setParticles] = useState([]);

  const createConfetti = (x, y, count = 30) => {
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: Math.random(),
      x,
      y,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * -10 - 5,
      life: 1,
      size: Math.random() * 8 + 4,
      color: ['#c9a961', '#7f77dd', '#1d9e75'][Math.floor(Math.random() * 3)],
      rotation: Math.random() * 360
    }));

    setParticles(prev => [...prev, ...newParticles]);

    // Animation loop
    const animate = () => {
      setParticles(prev => {
        const updated = prev
          .map(p => ({
            ...p,
            y: p.y + p.vy,
            x: p.x + p.vx,
            vy: p.vy + 0.2, // gravity
            life: p.life - 0.015,
            rotation: p.rotation + 5
          }))
          .filter(p => p.life > 0);

        if (updated.length > 0) {
          setTimeout(animate, 20);
        }

        return updated;
      });
    };

    animate();
  };

  return { particles, createConfetti };
}

export function ParticleCanvas({ particles }) {
  return (
    <div className="particle-container">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.life,
            transform: `rotate(${p.rotation}deg)`,
            borderRadius: '50%'
          }}
        />
      ))}
    </div>
  );
}
