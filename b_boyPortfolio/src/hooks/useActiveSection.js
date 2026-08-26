import { useEffect, useRef, useState } from "react";

/**
 * useActiveSection
 * Tracks which section (by id) is currently most visible in the
 * viewport, so you can drive a scroll-spy nav and background color
 * shifts without any page reloads or routing library.
 *
 * Usage in App.jsx:
 *
 *   const sectionIds = ["home", "projects", "about", "contact"];
 *   const activeId = useActiveSection(sectionIds);
 *
 *   // then e.g.
 *   const hueMap = { home: 0, projects: -40, about: 15, contact: 30 };
 *   <SynthwaveBackground hue={hueMap[activeId] ?? 0} />
 *
 * Each section in your JSX needs a matching id:
 *   <section id="home">...</section>
 *   <section id="projects">...</section>
 */
export default function useActiveSection(sectionIds = [], options = {}) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null);
  const ratios = useRef({});

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.current[entry.target.id] = entry.intersectionRatio;
        });

        // pick whichever observed section currently has the most
        // visible area on screen
        const mostVisible = Object.entries(ratios.current).sort(
          (a, b) => b[1] - a[1]
        )[0];

        if (mostVisible && mostVisible[1] > 0) {
          setActiveId(mostVisible[0]);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "0px",
        ...options,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds, options]);

  return activeId;
}

/*
=====================================================================
NOTES
=====================================================================
- Pure vanilla React + browser IntersectionObserver — no router or
  extra dependency needed for a one-page scroll site.
- Returns the id (string) of whichever tracked section currently has
  the largest visible area, updating as the user scrolls.
- Use the returned id to: (1) highlight the active nav link, and
  (2) look up a hue value to pass into SynthwaveBackground so the
  scene color shifts as different sections come into view.
*/
