import React from "react";

/**
 * ProjectsSection
 * A "Projects" section for a one-page scroll site — no routing, no
 * new page load. Just give it an id and place it below your hero in
 * App.jsx; the browser's native smooth scroll (plus a nav link) will
 * carry the user down to it.
 *
 * Usage in App.jsx:
 *
 *   <section id="home" className="min-h-screen ...">...hero...</section>
 *   <ProjectsSection />
 *
 * Pass your real project data via the `projects` prop, e.g.:
 *
 *   const projects = [
 *     { title: "Portfolio Site", description: "...", tags: ["React","Tailwind"], link: "https://..." },
 *     ...
 *   ];
 *   <ProjectsSection projects={projects} />
 */
const placeholderProjects = [
  {
    title: "Project One",
    description: "A short one- or two-line description of what this project does and the problem it solves.",
    tags: ["React", "Tailwind"],
    link: "#",
  },
  {
    title: "Project Two",
    description: "A short one- or two-line description of what this project does and the problem it solves.",
    tags: ["Node", "MongoDB"],
    link: "#",
  },
  {
    title: "Project Three",
    description: "A short one- or two-line description of what this project does and the problem it solves.",
    tags: ["Next.js", "API"],
    link: "#",
  },
];

export default function ProjectsSection({ projects = placeholderProjects }) {
  return (
    <section
      id="projects"
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
        Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {projects.map((project, i) => (
          <a
            key={i}
            href={project.link}
            target={project.link?.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group relative rounded-xl border border-[#ff2e88]/30 bg-[#1a0b3d]/60 backdrop-blur-sm p-6 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#00fff5] hover:shadow-[0_0_30px_rgba(0,255,245,0.35)]"
          >
            {/* corner accent */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00fff5] rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ff2e88] rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <h3 className="text-xl font-semibold text-[#00fff5] tracking-wide group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-gray-300/90 leading-relaxed">
              {project.description}
            </p>

            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-auto pt-3">
                {project.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    className="text-[11px] uppercase tracking-wider px-2 py-1 rounded-full border border-[#ff2e88]/40 text-[#ff2e88]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}


