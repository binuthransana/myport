import { useState, useEffect } from 'react';

/**
 * useActiveSection
 * Observes an array of section IDs and returns the ID of the section
 * currently most visible on the screen.
 */
export function useActiveSection(sectionIds, threshold = 0.5) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold } // Triggers when 50% of the section is visible
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds, threshold]);

  return activeSection;
}