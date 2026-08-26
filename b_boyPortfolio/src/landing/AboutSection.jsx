import React from "react";

const placeholderBio = [
  "Hi, I'm Binuth Ransana — a developer who loves building clean, purposeful interfaces with a bit of personality. I enjoy turning ideas into interactive experiences, from small UI details to full end-to-end applications.",
  "I'm currently focused on front-end development with React and Tailwind CSS, and I'm always exploring new ways to blend solid engineering with distinctive visual design — like this synthwave-themed portfolio you're looking at right now.",
];

const placeholderSkills = [
  "React",
  "JavaScript",
  "Tailwind CSS",
  "HTML & CSS",
  "Node.js",
  "Git",
];

export default function AboutSection({
  bio = placeholderBio,
  skills = placeholderSkills,
  photo,
}) {
  return (
    <section
      id="about"
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
        About
      </h2>

      {/* NEW: Frosted Glass Wrapper */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12 items-center bg-[#1a0b3d]/70 backdrop-blur-md border border-[#00fff5]/30 rounded-2xl p-8 sm:p-12 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        
        {/* Photo frame */}
        <div className="mx-auto md:mx-0">
          <div
            className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-2"
            style={{
              borderColor: "#00fff5",
              boxShadow:
                "0 0 20px 4px rgba(0,255,245,0.5), 0 0 40px 10px rgba(255,46,136,0.25)",
            }}
          >
            {photo ? (
              <img
                src={photo}
                alt="Binuth Ransana"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#0d0221] text-[#00fff5] text-5xl font-bold">
                BR
              </div>
            )}
          </div>
        </div>

        {/* Bio + skills */}
        <div className="flex flex-col gap-6 text-center md:text-left">
          <div className="flex flex-col gap-4 z-10">
            {bio.map((paragraph, i) => (
              <p key={i} className="text-gray-200 text-sm sm:text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {skills?.length > 0 && (
            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border border-[#ff2e88]/60 text-[#ff2e88] bg-[#0d0221]/50 hover:border-[#00fff5] hover:text-[#00fff5] hover:shadow-[0_0_10px_rgba(0,255,245,0.4)] transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}