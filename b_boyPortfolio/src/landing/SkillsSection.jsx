import React, { useEffect, useRef, useState } from "react";

/**
 * SkillsSection
 * A "Skills" section for the one-page scroll site — neon cards, each
 * with a glowing proficiency bar that fills in once the section
 * scrolls into view. Same self-contained pattern as your other
 * sections, no extra dependencies.
 *
 * Usage in App.jsx:
 *
 *   <AboutSection />
 *   <SkillsSection
 *     skills={[
 *       { name: "React", level: 90, category: "Frontend" },
 *       { name: "Tailwind CSS", level: 85, category: "Frontend" },
 *       { name: "JavaScript", level: 88, category: "Language" },
 *       { name: "Node.js", level: 70, category: "Backend" },
 *     ]}
 *   />
 *   <ProjectsSection />
 *
 * If you don't pass `skills`, placeholder data below is used so you
 * can see the layout immediately.
 */
const placeholderSkills = [
  { name: "React", level: 40, category: "Frontend" },
  { name: "JavaScript", level: 35, category: "Language" },
  { name: "Python", level: 60, category: "Language" },
  { name: "HTML & CSS", level: 90, category: "Frontend" },
  { name: "C++", level: 70, category: "Language" },
  { name: "Git & GitHub", level: 80, category: "Tools" },
];

export default function SkillsSection({ skills = placeholderSkills }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Trigger the bar-fill animation only once, when the section first
  // scrolls into view — rather than on page load, so it feels earned.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-6 py-24"
    >
      <h2
        className="text-4xl sm:text-5xl font-bold tracking-widest uppercase mb-14 text-center"
        style={{
          background: "linear-gradient(90deg, #00fff5, #ff2e88)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          textShadow: "0 0 25px rgba(255,46,136,0.4)",
        }}
      >
        Skills
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {skills.map((skill, i) => (
          <div
            key={i}
            className="group relative rounded-xl border border-[#ff2e88]/30 bg-[#1a0b3d]/60 backdrop-blur-sm p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#00fff5] hover:shadow-[0_0_25px_rgba(0,255,245,0.3)]"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-white tracking-wide">
                {skill.name}
              </h3>
              {skill.category && (
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#ff2e88]/40 text-[#ff2e88]">
                  {skill.category}
                </span>
              )}
            </div>

            {/* proficiency bar */}
            <div className="relative h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-1400 ease-out"
                style={{
                  width: visible ? `${skill.level}%` : "0%",
                  background: "linear-gradient(90deg, #00fff5, #ff2e88)",
                  boxShadow: "0 0 10px rgba(0,255,245,0.6)",
                }}
              />
            </div>

            <span className="text-xs text-gray-400 self-end tabular-nums">
              {skill.level}%
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}


