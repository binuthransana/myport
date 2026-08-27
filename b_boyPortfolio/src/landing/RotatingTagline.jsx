import React, { useEffect, useState } from "react";

/**
 * RotatingTagline
 * Replaces a single static line like:
 *   "Full Stack Developer // Cybernetic Architect // Synthwave Enthusiast"
 * with the same roles cycling one at a time, each one flickering in
 * like an unstable neon sign.
 *
 * Usage — drop this in place of your <p> in App.jsx:
 *
 *   <RotatingTagline
 *     lines={[
 *       "Full Stack Developer",
 *       "Cybernetic Architect",
 *       "Synthwave Enthusiast",
 *     ]}
 *   />
 *
 * Keeps your exact original classes (font-orbitron text-gray-300
 * text-lg md:text-xl max-w-lg mx-auto) so it drops in without
 * changing your layout.
 */
const defaultLines = [
  "Computer Science Undergraduate",
  "Developer",
  "Tech Enthusiast",
];

export default function RotatingTagline({
  lines = defaultLines,
  interval = 2800,
  className = "",
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % lines.length);
    }, interval);
    return () => clearInterval(id);
  }, [lines, interval]);

  return (
    <p
      className={`font-orbitron text-gray-300 text-lg md:text-xl max-w-lg mx-auto text-center min-h-[1.75em] ${className}`}
    >
      {/* the `key` forces React to remount this span on every change,
          which restarts the CSS animation from scratch each time */}
      <span key={index} className="inline-block animate-role-flicker">
        {lines[index]}
      </span>
    </p>
  );
}

/*
=====================================================================
TAILWIND SETUP — merge into tailwind.config.js theme.extend
(add alongside your existing keyframes/animation, don't replace them)
=====================================================================

keyframes: {
  // ...keep grid-move, twinkle, sun-pulse, horizon-glow, scanline-flicker,
  //     cursor-blink, underline-sweep, pulse-soft, write-on, pen-tip,
  //     logo-flicker...
  "role-flicker": {
    "0%":   { opacity: 0 },
    "4%":   { opacity: 1 },
    "8%":   { opacity: 0.2 },
    "12%":  { opacity: 1 },
    "18%":  { opacity: 0.3 },
    "22%":  { opacity: 1 },
    "100%": { opacity: 1 },
  },
},
animation: {
  // ...keep your existing ones...
  "role-flicker": "role-flicker 0.7s steps(1, end)",
},

=====================================================================
HOW IT WORKS
=====================================================================
- One role shows at a time instead of all three joined by "//".
- Every `interval` ms (default 2800ms = 2.8s) it swaps to the next
  role in the `lines` array, looping back to the start at the end.
- Changing the `key` prop on the inner <span> to `index` forces React
  to tear down and remount that span whenever the text changes, which
  restarts the `role-flicker` CSS animation from 0% every time — that's
  what gives the "flickering on" feel on each swap rather than a plain
  cross-fade.
- `min-h-[1.75em]` on the wrapping <p> stops the paragraph's height
  from jumping if one role happens to wrap to a second line and
  another doesn't.
- Pass your own `lines` array and `interval` (ms) to customize; omit
  both to use the three defaults above.
*/
