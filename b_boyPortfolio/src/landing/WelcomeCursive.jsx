import React from "react";

/**
 * WelcomeCursive
 * A "Welcome" heading that animates like it's being handwritten in
 * cursive, glowing neon-style to match the synthwave theme.
 *
 * Usage in App.jsx:
 *
 *   import WelcomeCursive from "./components/WelcomeCursive";
 *
 *   <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
 *     <WelcomeCursive />
 *     <h2 className="text-white mt-4">...rest of your hero...</h2>
 *   </div>
 *
 * REQUIRES a cursive Google Font — add this ONE line to the <head>
 * of your public/index.html (see bottom of file for exact snippet).
 */
export default function WelcomeCursive({ text = "I am", delay = 0 }) {
  return (
    <div className="relative inline-block">
      <h1
        className="relative whitespace-nowrap animate-write-on"
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(3rem, 10vw, 7rem)",
          fontWeight: 700,
          color: "#00fff5",
          textShadow:
            "0 0 8px rgba(0,255,245,0.9), 0 0 20px rgba(0,255,245,0.6), 0 0 40px rgba(255,46,136,0.4)",
          WebkitTextStrokeWidth: "1px",
          WebkitTextStrokeColor: "rgba(0,255,245,0.8)",
          animationDelay: `${delay}s`,
        }}
      >
        {text}
      </h1>

      {/* glowing pen tip that travels with the reveal */}
      <span
        className="absolute top-1/2 -translate-y-1/2 h-[70%] w-0.75 rounded-full animate-pen-tip"
        style={{
          left: 0,
          background: "#ff2e88",
          boxShadow: "0 0 10px 3px rgba(255,46,136,0.9)",
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
}

/*
=====================================================================
1) ADD THE FONT — put this in public/index.html inside <head>
=====================================================================

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet">

(Dancing Script is a flowing cursive/script font — great for a
"handwritten" neon look. Swap for "Great Vibes" or "Pacifico" if you
want a different script style — just update the fontFamily above to
match.)

=====================================================================
2) TAILWIND SETUP — merge into tailwind.config.js theme.extend
(add alongside your existing keyframes/animation, don't replace them)
=====================================================================

keyframes: {
  // ...keep your existing ones (grid-move, twinkle, sun-pulse, etc.)...
  "write-on": {
    "0%": { clipPath: "inset(0 100% 0 0)" },
    "100%": { clipPath: "inset(0 0% 0 0)" },
  },
  "pen-tip": {
    "0%": { left: "0%", opacity: 1 },
    "95%": { opacity: 1 },
    "100%": { left: "100%", opacity: 0 },
  },
},
animation: {
  // ...keep your existing ones...
  "write-on": "write-on 1.8s cubic-bezier(0.65, 0, 0.35, 1) forwards",
  "pen-tip": "pen-tip 1.8s cubic-bezier(0.65, 0, 0.35, 1) forwards",
},

=====================================================================
HOW IT WORKS
=====================================================================
- The word is revealed left-to-right using a clip-path wipe (0% to
  100% width) over 1.8s, which — combined with a cursive font — reads
  as "being written" rather than a typewriter/monospace reveal.
- A small glowing pink bar (the "pen tip") travels across in sync
  with the reveal, then fades out once the word is fully written.
- `delay` prop lets you stagger this after your loading screen exits,
  e.g. <WelcomeCursive delay={0.3} /> so it starts just after the
  intro fades away instead of immediately on mount.
- Both animations use `forwards` so the end state (fully visible
  text, pen tip gone) persists after the animation completes.

=====================================================================
COMBINING WITH LOADING SCREEN
=====================================================================
If this sits right after your LoadingScreen exits:

  {!loading && <WelcomeCursive delay={0.1} />}

...gives a smooth handoff: intro fades out, then "Welcome" writes
itself in immediately after.
*/
