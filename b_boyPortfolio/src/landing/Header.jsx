import React, { useEffect, useState } from "react";
import NavLogo from "./NavLogo";

/**
 * Header
 * Desktop: logo left, horizontal nav links right.
 * Mobile: logo left, animated hamburger icon right — tapping it
 * unfurls a dropdown panel directly below the header (not a
 * fullscreen overlay), with a dimmed backdrop behind it that closes
 * the menu when tapped.
 *
 * Usage in App.jsx — reuse the same sectionIds/activeId you already
 * have from useActiveSection:
 *
 *   <Header sectionIds={sectionIds} activeId={activeId} />
 */
export default function Header({
  sectionIds = ["home", "about", "skills", "projects", "contact"],
  activeId,
  labels = {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = sectionIds.filter((id) => id !== "home"); // logo covers "home"

  const labelFor = (id) =>
    labels[id] || id.charAt(0).toUpperCase() + id.slice(1);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  // lock background scroll while the dropdown is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-6 sm:px-10 py-4 backdrop-blur-sm bg-[#0d0221]/60">
      <div className="flex items-center justify-between">
        <NavLogo />

        {/* Desktop links */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={scrollTo(id)}
              className={`uppercase text-sm tracking-widest transition-colors ${
                activeId === id
                  ? "text-[#00fff5]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {labelFor(id)}
            </a>
          ))}
        </div>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="md:hidden relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-1.25"
        >
          <span
            className={`block h-0.5 w-6 rounded-full bg-[#00fff5] transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-1.75" : ""
            }`}
            style={{ boxShadow: "0 0 6px rgba(0,255,245,0.7)" }}
          />
          <span
            className={`block h-0.5 w-6 rounded-full bg-[#00fff5] transition-all duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
            style={{ boxShadow: "0 0 6px rgba(0,255,245,0.7)" }}
          />
          <span
            className={`block h-0.5 w-6 rounded-full bg-[#00fff5] transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-1.75" : ""
            }`}
            style={{ boxShadow: "0 0 6px rgba(0,255,245,0.7)" }}
          />
        </button>
      </div>

      {/* Dimmed backdrop behind the dropdown — tap to close */}
      <div
        onClick={() => setIsOpen(false)}
        className={`md:hidden fixed inset-0 -z-10 bg-[#0d0221]/60 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Dropdown panel — unfurls from directly under the header */}
      <div
        className={`md:hidden absolute top-full left-1/2 -translate-x-1/2 w-[88%] max-w-xs origin-top transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 scale-y-100 translate-y-2"
            : "opacity-0 scale-y-90 translate-y-0 pointer-events-none"
        }`}
      >
        {/* NEW: Heavy Frosted Glass Panel */}
        <div
          className="mt-2 rounded-2xl border border-[#00fff5]/50 bg-[#1a0b3d]/30 backdrop-blur-xl p-5 flex flex-col gap-2"
          style={{ 
            boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 30px rgba(0,255,245,0.25), inset 0 0 20px rgba(255,255,255,0.05)" 
          }}
        >
          {navLinks.map((id, i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={scrollTo(id)}
              className={`py-3 text-center uppercase text-sm tracking-widest rounded-xl transition-all duration-300 ${
                activeId === id
                  ? "text-[#00fff5] bg-white/5"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
              style={{
                transitionProperty: "opacity, transform, color, background-color",
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(-6px)",
                transitionDelay: isOpen ? `${i * 60}ms` : "0ms",
              }}
            >
              {labelFor(id)}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/*
=====================================================================
WHAT CHANGED FROM THE FULLSCREEN VERSION
=====================================================================
- Replaced the fullscreen centered overlay with a compact dropdown
  panel that unfurls directly below the header bar (top-full), using
  scale-y + translate-y + opacity together for a genuine "unfurling"
  motion rather than a flat fade.
- Added a separate dimmed backdrop layer (bg-black/70 + blur) behind
  the panel that covers the rest of the screen — this is what was
  missing before, which is why your hero content was showing through.
  Tapping the backdrop closes the menu.
- Each link inside the panel fades/slides in with a small staggered
  delay (i * 60ms) as the panel opens, so the links feel like they're
  populating in sequence rather than all appearing at once.
- `origin-top` on the panel means the scale animation grows downward
  from the header, matching how a real dropdown should move.
- Backdrop and panel both live inside the same `<nav>`, so no
  changes needed to how you mount <Header /> in App.jsx.

=====================================================================
NO NEW TAILWIND CONFIG NEEDED
=====================================================================
Everything here uses transition-all/transition-opacity plus inline
transitionDelay for the stagger — nothing to merge into
tailwind.config.js.
*/