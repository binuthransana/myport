import React from "react";

/**
 * SynthwaveBackground
 * Drop this in as a fixed, full-viewport background layer.
 */
export default function SynthwaveBackground({ hue = 0 }) {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden bg-[#0d0221] transition-[filter] duration-1200 ease-in-out"
      style={{ filter: `hue-rotate(${hue}deg)` }}
    >
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-[#1a0b3d] via-[#1a0b3d] to-[#0d0221]" />

      {/* Stars */}
      <div className="absolute inset-0 opacity-70">
        {Array.from({ length: 60 }).map((_, i) => {
          const top = Math.random() * 55;
          const left = Math.random() * 100;
          const size = Math.random() * 1.5 + 0.5;
          const delay = Math.random() * 4;
          return (
            <span
              key={i}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* Shooting Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3, 4].map((_, i) => {
          // Keep them spawning mostly in the top right quadrant
          const top = Math.random() * 30;
          const left = 40 + Math.random() * 60; 
          // Randomize when they appear so they don't sync up
          const delay = Math.random() * 10;
          
          return (
            <div
              key={`shooting-${i}`}
              className="absolute h-0.5 w-30 bg-linear-to-r from-transparent to-[#00fff5] animate-shooting-star rounded-full opacity-0"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* Sun */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: "18%", width: "38vmin", height: "38vmin" }}
      >
        <div
          className="w-full h-full rounded-full animate-sun-pulse"
          style={{
            background:
              "linear-gradient(180deg, #ffd319 0%, #ff8a00 35%, #ff2e88 65%, #ff2e88 100%)",
          }}
        />
        {/* horizontal cut lines to give the sun that retro striped look */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[0.55, 0.63, 0.7, 0.77, 0.84, 0.91].map((posFrac, i) => (
            <div
              key={i}
              className="absolute left-0 w-full bg-[#0d0221]"
              style={{
                top: `${posFrac * 100}%`,
                height: `${2 + i * 0.6}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Horizon glow line */}
      <div
        className="absolute left-0 w-full animate-horizon-glow"
        style={{
          top: "58%",
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, #00fff5, #ff2e88, #00fff5, transparent)",
        }}
      />

      {/* Neon grid floor */}
      <div
        className="absolute left-0 w-full overflow-hidden"
        style={{ top: "58%", height: "42%", perspective: "300px" }}
      >
        <div
          className="absolute inset-0 animate-grid-move"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,46,136,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,46,136,0.7) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform: "rotateX(75deg)",
            transformOrigin: "top",
            height: "200%",
          }}
        />
      </div>

      {/* Vignette + scanlines for extra retro texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0d0221_100%)]" />
      
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
        }}
      />
    </div>
  );
}