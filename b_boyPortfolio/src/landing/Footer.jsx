import React from "react";

/**
 * Footer
 * A simple, minimal footer — just a divider, copyright text, and a
 * couple of quick links. No icons, no extra effects.
 *
 * Usage in App.jsx — place after ContactSection, inside your main
 * content wrapper:
 *
 *   <ContactSection ... />
 *   <Footer name="Binuth Ransana" />
 */
export default function Footer({ name = "Binuth Ransana" }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full px-6 py-8 border-t border-white/10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
        <p>© {year} {name}. All rights reserved.</p>

        <div className="flex gap-6">
          <a href="#home" className="hover:text-[#00fff5] transition-colors">
            Home
          </a>
          <a href="#projects" className="hover:text-[#00fff5] transition-colors">
            Projects
          </a>
          <a href="#contact" className="hover:text-[#00fff5] transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

/*
=====================================================================
NOTES
=====================================================================
- No new Tailwind keyframes/animations needed — just static styling.
- Sits in normal page flow after ContactSection, at the very bottom.
- Swap the three links for whichever section ids you're actually
  using, or add more the same way.
*/
