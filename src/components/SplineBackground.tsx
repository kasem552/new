import React from 'react';

export default function SplineBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated Gradient Background */}
      <div 
        className="absolute inset-0 animate-gradient"
        style={{
          background: `
            linear-gradient(
              -45deg,
              rgba(31, 87, 106, 0.9),
              rgba(31, 220, 234, 0.8),
              rgba(134, 162, 171, 0.9),
              rgba(31, 220, 234, 0.8)
            )`,
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
        }}
      />

      {/* Animated Particles */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            background: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
            animation: `float ${15 + Math.random() * 15}s linear infinite`,
            animationDelay: `-${Math.random() * 15}s`,
          }}
        />
      ))}

      {/* Glowing Orbs */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 300 + 100}px`,
            height: `${Math.random() * 300 + 100}px`,
            background: `radial-gradient(circle, rgba(31, 220, 234, ${Math.random() * 0.2 + 0.1}) 0%, rgba(31, 87, 106, 0) 70%)`,
            animation: `pulse ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `-${Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Animated Wave Effect */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-64 opacity-30"
        style={{
          background: `
            linear-gradient(
              180deg,
              transparent 0%,
              rgba(31, 220, 234, 0.1) 50%,
              rgba(31, 87, 106, 0.2) 100%
            )
          `,
          animation: 'wave 8s ease-in-out infinite',
        }}
      />
    </div>
  );
}