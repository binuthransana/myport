import React, { useEffect, useState } from "react";


export default function LoadingScreen({ onFinish, duration = 2600 }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  // drive progress with requestAnimationFrame so the sun's rise is
  // perfectly smooth rather than stepping in fixed increments
  useEffect(() => {
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setExiting(true), 350); // brief hold at 100%
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => onFinish && onFinish(), 700); // matches exit transition below
    return () => clearTimeout(t);
  }, [exiting, onFinish]);

  // sun rises from below the horizon (progress 0) up to its resting
  // spot (progress 100)
  const sunOffset = 90 - (progress / 100) * 90; // px, 90 -> 0

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-[#0d0221] transition-all duration-700 ease-in-out ${
        exiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* self-contained keyframes — nothing to merge into tailwind.config.js */}
      <style>{`
        @keyframes ls-twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes ls-grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 0 60px; }
        }
        @keyframes ls-scanline-flicker {
          0%, 100% { opacity: 0.06; }
          50% { opacity: 0.03; }
        }
      `}</style>

      {/* stars */}
      <div className="absolute inset-0 opacity-60">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 45}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 1.5 + 0.5}px`,
              height: `${Math.random() * 1.5 + 0.5}px`,
              animation: "ls-twinkle 3s ease-in-out infinite",
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* rising sun, centered */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ top: "-27%" }}
      >
        <div
          className="relative overflow-hidden rounded-full"
          style={{
            width: "32vmin",
            height: "32vmin",
            transform: `translateY(${sunOffset}px)`,
            background:
              "linear-gradient(180deg, #ffd319 0%, #ff8a00 35%, #ff2e88 65%, #ff2e88 100%)",
            boxShadow:
              "0 0 80px 15px rgba(255,46,136,0.5), 0 0 140px 50px rgba(255,138,0,0.2)",
          }}
        >
          {[0.55, 0.63, 0.7, 0.77, 0.84, 0.91].map((posFrac, i) => (
            <div
              key={i}
              className="absolute left-0 w-full bg-[#0d0221]"
              style={{ top: `${posFrac * 100}%`, height: `${2 + i * 0.6}%` }}
            />
          ))}
        </div>
      </div>

      {/* horizon line */}
      <div
        className="absolute left-0 w-full"
        style={{
          top: "60%",
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, #00fff5, #ff2e88, #00fff5, transparent)",
          boxShadow: "0 0 20px 4px rgba(0,255,245,0.6)",
        }}
      />

      {/* simple CSS perspective grid floor — no canvas, no extra file */}
      <div
        className="absolute left-0 w-full overflow-hidden"
        style={{ top: "60%", height: "40%", perspective: "300px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,46,136,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,46,136,0.7) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform: "rotateX(75deg)",
            transformOrigin: "top",
            height: "200%",
            animation: "ls-grid-move 1.2s linear infinite",
          }}
        />
      </div>

      {/* status readout + progress bar */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-56">
        <p className="text-xs tracking-[0.4em] text-[#00fff5] uppercase">
          Loading... {Math.floor(progress)}%
        </p>
        <div className="w-full h-0.75 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #00fff5, #ff2e88)",
              boxShadow: "0 0 10px rgba(0,255,245,0.7)",
            }}
          />
        </div>
      </div>

      {/* scanline flicker for CRT texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
          animation: "ls-scanline-flicker 2s steps(2) infinite",
        }}
      />
    </div>
  );
}

