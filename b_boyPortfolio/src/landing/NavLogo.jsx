import React from "react";


export default function NavLogo({ label = "BR", targetId = "home" }) {
  const handleClick = (e) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      aria-label="Go to home"
      className="group relative inline-flex items-center select-none cursor-pointer"
    >
      <span
        className="text-2xl sm:text-3xl font-bold tracking-widest animate-logo-flicker transition-transform duration-300 group-hover:scale-110"
        style={{
          fontFamily: "'Segoe UI', sans-serif",
          background: "linear-gradient(180deg, #00fff5 0%, #ff2e88 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          textShadow: "0 0 15px rgba(255,46,136,0.6)",
          filter: "drop-shadow(0 0 8px rgba(0,255,245,0.5))",
        }}
      >
        {label}
      </span>

      {/* underline sweep on hover, same visual language as your nav links */}
      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-linear-to-r from-[#00fff5] to-[#ff2e88] transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

/*
=====================================================================
TAILWIND SETUP — merge into tailwind.config.js theme.extend
(add alongside your existing keyframes/animation, don't replace them)
=====================================================================

keyframes: {
  // ...keep grid-move, twinkle, sun-pulse, horizon-glow, scanline-flicker,
  //     cursor-blink, underline-sweep, pulse-soft, write-on, pen-tip...
  "logo-flicker": {
    "0%, 100%": { opacity: 1 },
    "8%": { opacity: 0.6 },
    "10%": { opacity: 1 },
    "20%": { opacity: 0.85 },
    "22%": { opacity: 1 },
  },
},
animation: {
  // ...keep your existing ones...
  "logo-flicker": "logo-flicker 5s ease-in-out infinite",
},

=====================================================================
HOW IT WORKS
=====================================================================
- The "BR" text idles with a slow neon flicker (like a sign that's
  slightly unstable), and scales up on hover for a clear interactive
  cue.
- Clicking calls scrollIntoView on the id="home" section — same
  mechanism as your other nav links, just packaged as a logo instead
  of a text link.
- `label` prop lets you swap "BR" for your full initials or wordmark;
  `targetId` lets you point it at a different section id if your home
  section is ever renamed.

=====================================================================
FULL NAV EXAMPLE — logo left, links right (matches typical portfolio layout)
=====================================================================

<nav className="fixed top-0 left-0 w-full z-40 flex items-center justify-between px-6 sm:px-10 py-4 backdrop-blur-sm bg-[#0d0221]/40">
  <NavLogo />

  <div className="flex gap-8">
    {sectionIds
      .filter((id) => id !== "home")
      .map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={`uppercase text-sm tracking-widest transition-colors ${
            activeId === id ? "text-[#00fff5]" : "text-white/60 hover:text-white"
          }`}
        >
          {id}
        </a>
      ))}
  </div>
</nav>

This assumes you already have `sectionIds` and `activeId` from
useActiveSection, as set up for the Projects/About/Contact hue shifts.
*/
