import React from "react";

/**
 * NavDots
 * A modern right-side scroll-spy navigation: hollow neon dots that
 * morph into a glowing vertical pill when active, with a label that
 * slides in on hover and a faint connecting track line behind them.
 *
 * Replaces a plain "filled circle that scales up" dot nav with a
 * more considered, modern interaction.
 *
 * Usage in App.jsx — reuse the same sectionIds/activeId you already
 * have from useActiveSection, no need to duplicate the array:
 *
 *   <NavDots sectionIds={sectionIds} activeId={activeId} />
 *
 * Optional: pass custom display labels (defaults to a capitalized
 * version of each id):
 *
 *   <NavDots
 *     sectionIds={sectionIds}
 *     activeId={activeId}
 *     labels={{ home: "Home", about: "About Me" }}
 *   />
 */
export default function NavDots({
  sectionIds = ["home", "about", "skills", "projects", "contact"],
  activeId,
  labels = {},
}) {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const labelFor = (id) =>
    labels[id] || id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <div className="fixed right-5 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-5">
      {/* faint connecting track line behind the dots */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(0,255,245,0.35), rgba(255,46,136,0.35), transparent)",
        }}
      />

      {sectionIds.map((id) => {
        const isActive = activeId === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={scrollTo(id)}
            aria-label={`Scroll to ${labelFor(id)}`}
            className="group relative flex items-center justify-end"
          >
            {/* label pill — slides in from the right on hover */}
            <span
              className="absolute right-full mr-3 whitespace-nowrap px-3 py-1 rounded-full text-[11px] uppercase tracking-widest text-white/90 bg-[#1a0b3d]/80 border border-[#00fff5]/40 backdrop-blur-sm opacity-0 translate-x-2 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0"
              style={{ boxShadow: "0 0 12px rgba(0,255,245,0.25)" }}
            >
              {labelFor(id)}
            </span>

            {/* indicator — hollow dot at rest, morphs into a glowing
                pill when this section is active */}
            <span
              className={`relative z-10 rounded-full border-2 transition-all duration-300 ease-out ${
                isActive
                  ? "w-3 h-8 border-[#00fff5] bg-[#00fff5]"
                  : "w-2.5 h-2.5 border-[#00fff5]/50 bg-transparent group-hover:border-[#ff2e88] group-hover:bg-[#ff2e88]/30 group-hover:scale-125"
              }`}
              style={
                isActive
                  ? { boxShadow: "0 0 14px 2px rgba(0,255,245,0.8)" }
                  : undefined
              }
            />
          </a>
        );
      })}
    </div>
  );
}

/*
=====================================================================
WHAT'S DIFFERENT FROM A PLAIN DOT NAV
=====================================================================
- Dots are hollow (border only) at rest instead of solid filled
  circles — reads as lighter and more refined.
- The active dot morphs into a vertical pill shape (w-3 h-8) rather
  than just scaling up, which is a much more common "modern nav"
  pattern (seen in a lot of current portfolio/product sites).
- Hovering any dot slides in a small glass-style label pill showing
  the section name, so the nav is self-explanatory without needing
  visible text at rest.
- A thin gradient track line runs behind the dots top-to-bottom,
  giving the whole stack a sense of structure instead of floating
  dots in space.
- No new Tailwind keyframes/animations required — everything here
  uses transition-all with Tailwind's built-in easing.

=====================================================================
REPLACING YOUR EXISTING SNIPPET
=====================================================================
If you already have the dot nav inline in App.jsx, delete that block
entirely and replace it with:

  <NavDots sectionIds={sectionIds} activeId={activeId} />

...using the same `sectionIds` array and `activeId` value you already
pass into SynthwaveBackground's hueMap/intensityMap lookups — no new
state or observer needed, this component is purely presentational.
*/
