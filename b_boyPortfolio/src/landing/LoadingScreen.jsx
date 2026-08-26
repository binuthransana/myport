import React, { useEffect, useState } from "react";

/**
 * LoadingScreen
 * A synthwave intro that types out "BINUTH RANSANA" letter by letter
 * with a blinking neon cursor, then fades out to reveal the site
 * underneath.
 *
 * Usage in App.jsx:
 *
 *   import { useState } from "react";
 *   import LoadingScreen from "./components/LoadingScreen";
 *   import SynthwaveBackground from "./components/SynthwaveBackground";
 *
 *   function App() {
 *     const [loading, setLoading] = useState(true);
 *
 *     return (
 *       <div className="relative min-h-screen bg-[#0d0221] overflow-hidden">
 *         <SynthwaveBackground />
 *         {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
 *         <div className={`relative z-10 transition-opacity duration-700 ${loading ? "opacity-0" : "opacity-100"}`}>
 *           ...your real page content...
 *         </div>
 *       </div>
 *     );
 *   }
 *
 * Tailwind config additions needed — see bottom of this file
 * (adds to, not replaces, the ones from SynthwaveBackground).
 */
const FULL_NAME = "BINUTH RANSANA";

export default function LoadingScreen({ onFinish, typeSpeed = 90, holdDuration = 700 }) {
  const [exiting, setExiting] = useState(false);
  const [typed, setTyped] = useState("");

  // Type the name out letter by letter, then hold, then exit.
  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      i += 1;
      setTyped(FULL_NAME.slice(0, i));
      if (i >= FULL_NAME.length) {
        clearInterval(typeInterval);
      }
    }, typeSpeed);

    return () => clearInterval(typeInterval);
  }, [typeSpeed]);

  useEffect(() => {
    const typingDuration = FULL_NAME.length * typeSpeed;
    const exitTimer = setTimeout(() => setExiting(true), typingDuration + holdDuration);
    const finishTimer = setTimeout(() => {
      onFinish && onFinish();
    }, typingDuration + holdDuration + 700); // matches exit transition duration below

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [typeSpeed, holdDuration, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0221] transition-all duration-700 ease-in-out ${
        exiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* faint grid floor echo so the intro feels continuous with the site */}
      <div
        className="absolute left-0 bottom-0 w-full opacity-30"
        style={{ height: "40%", perspective: "300px", overflow: "hidden" }}
      >
        <div
          className="absolute inset-0 animate-grid-move"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,46,136,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,46,136,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform: "rotateX(75deg)",
            transformOrigin: "top",
            height: "200%",
          }}
        />
      </div>

      {/* Typed name logo */}
      <div className="relative flex flex-col items-center px-6">
        <h1
          className="whitespace-nowrap text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.15em] select-none"
          style={{
            fontFamily: "'Segoe UI', sans-serif",
            background: "linear-gradient(180deg, #00fff5 0%, #ff2e88 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textShadow: "0 0 30px rgba(255,46,136,0.6)",
            filter: "drop-shadow(0 0 12px rgba(0,255,245,0.5))",
          }}
        >
          {typed}
          <span className="inline-block w-0.75 sm:w-1 h-[0.85em] ml-1 align-middle bg-[#00fff5] animate-cursor-blink" />
        </h1>

        {/* underline sweep */}
        <div className="relative mt-4 h-0.5 w-40 overflow-hidden rounded-full bg-white/10">
          <div className="absolute inset-y-0 left-0 w-1/2 animate-underline-sweep bg-linear-to-r from-transparent via-[#00fff5] to-transparent" />
        </div>

        <p className="mt-5 text-xs sm:text-sm tracking-[0.4em] text-[#ff2e88] animate-pulse-soft uppercase">
          loading
        </p>
      </div>

      {/* corner scanline flicker for CRT feel */}
      <div
        className="absolute inset-0 pointer-events-none animate-scanline-flicker"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
        }}
      />
    </div>
  );
}

/*
=====================================================================
TAILWIND SETUP — merge into tailwind.config.js theme.extend
(add these alongside the keyframes/animation from SynthwaveBackground,
don't replace that block — just add the new entries below to it)
=====================================================================

keyframes: {
  // ...keep grid-move, twinkle, sun-pulse, horizon-glow, scanline-flicker...
  "cursor-blink": {
    "0%, 100%": { opacity: 1 },
    "50%": { opacity: 0 },
  },
  "underline-sweep": {
    "0%": { transform: "translateX(-100%)" },
    "100%": { transform: "translateX(300%)" },
  },
  "pulse-soft": {
    "0%, 100%": { opacity: 0.4 },
    "50%": { opacity: 1 },
  },
},
animation: {
  // ...keep grid-move, twinkle, sun-pulse, horizon-glow, scanline-flicker...
  "cursor-blink": "cursor-blink 0.8s step-end infinite",
  "underline-sweep": "underline-sweep 1.6s ease-in-out infinite",
  "pulse-soft": "pulse-soft 1.6s ease-in-out infinite",
},

=====================================================================
HOW IT WORKS
=====================================================================
- "BINUTH RANSANA" types out one letter at a time (typeSpeed ms per
  letter, default 90ms -> ~1.3s total), with a blinking neon cursor
  at the end of the text the whole time.
- After typing finishes, it holds for `holdDuration` ms (default 700ms)
  so the full name is readable, then fades + scales out over 700ms,
  then calls onFinish() so the parent can unmount it and reveal the
  real page.
- The parent page content should start at opacity-0 and transition to
  opacity-100 once `loading` becomes false, so the reveal feels like a
  crossfade rather than a hard cut (see usage example above).
- The text uses a gradient-clipped fill (cyan -> pink) with a layered
  drop-shadow so it reads as neon on dark backgrounds. text-3xl on
  mobile scaling up to text-6xl keeps the full name on one line.
- Tune pacing via props: <LoadingScreen typeSpeed={70} holdDuration={900} />

=====================================================================
NEXT OPTIONS
=====================================================================
- Trigger onFinish based on `window.onload` or a data-fetch promise
  instead of (or in addition to) the timer, for a more "real" loader.
- Add a second line under the name (e.g. a role/title) that fades in
  after typing completes.
*/
