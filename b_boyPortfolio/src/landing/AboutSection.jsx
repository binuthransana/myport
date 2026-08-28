import React from "react";

const placeholderBio = [
  "I am an aspiring Computer Science undergraduate at the General Sir John Kotelawala Defence University, Sri Lanka, with a strong passion for software development and the tech industry. I thrive on learning and applying emerging technologies to solve complex problems, transforming pure logic into seamless, high-performance digital experiences.",
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
      className=" relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-6 py-24"
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

     {/* NEW: Frosted Glass Wrapper with Hover Effects */}
      <div className="group w-full max-w-5xl grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12 items-center bg-[#1a0b3d]/70 backdrop-blur-md border border-[#00fff5]/30 rounded-2xl p-8 sm:p-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:border-[#00fff5] hover:shadow-[0_0_40px_rgba(0,255,245,0.4)]">
        
        {/* Photo frame */}
       <div className="mx-auto md:mx-0">
  <div
    className="group relative w-48 h-64 sm:w-56 sm:h-72 rounded-xl overflow-hidden border-2 transition-all duration-500 hover:scale-105 cursor-pointer"
    style={{
      borderColor: "#00fff5",
      boxShadow:
        "0 0 20px 4px rgba(0,255,245,0.5), 0 0 40px 10px rgba(255,46,136,0.25)",
    }}
  >
    {photo ? (
      <>
        {/* Base Image: Desaturated and contrast-boosted */}
        <img
          src={photo}
          alt="Binuth Ransana"
          className="w-full h-full object-cover object-[50%_20%] grayscale-[80%] contrast-125 brightness-90 transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
        />
        
        {/* Neon Tint Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00fff5]/40 to-[#ff2e88]/40 mix-blend-color pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
      </>
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