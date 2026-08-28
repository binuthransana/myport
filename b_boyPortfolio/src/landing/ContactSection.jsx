import React, { useState } from "react";
import emailjs from "@emailjs/browser";



// TODO: replace with your own EmailJS IDs (see setup notes above)
const SERVICE_ID = "service_vs9r0yz";
const TEMPLATE_ID = "template_ewmgdqu";
const PUBLIC_KEY = "8M8wq2vBBZXVjgkrC";

const icons = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55v-2.1c-3.17.69-3.84-1.36-3.84-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.18-3.06-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 5.74 0c2.18-1.48 3.14-1.17 3.14-1.17.63 1.58.24 2.75.12 3.04.74.8 1.18 1.82 1.18 3.06 0 4.37-2.67 5.33-5.21 5.62.41.36.77 1.06.77 2.15v3.19c0 .3.21.66.79.55A11.03 11.03 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.37 4.26 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.9 2H22l-7.4 8.44L23.3 22H16.9l-5-6.53L6.1 22H3l7.92-9.04L2.9 2h6.6l4.53 5.97L18.9 2Zm-1.12 18h1.72L7.3 3.9H5.46L17.78 20Z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.79.65 2.65a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.43-1.42a2 2 0 0 1 2.11-.45c.86.31 1.75.53 2.65.65A2 2 0 0 1 22 16.92Z" />
    </svg>
  ),
};

export default function ContactSection({
  email = "binuthran@gmail.com",
  phone = "+94 71 571 1322",
  socials = {
    github: "https://github.com/binuthransana",
    linkedin: "https://www.linkedin.com/in/binuth-ransana-/",
    twitter: "https://x.com/BinuthR",
  },
}) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full bg-[#1a0b3d]/70 border border-[#ff2e88]/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00fff5] focus:shadow-[0_0_15px_rgba(0,255,245,0.35)] transition-all duration-300";

  return (
    <section
      id="contact"
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
        Contact
      </h2>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: direct info + socials */}
        <div
          className="flex flex-col gap-6 justify-center rounded-2xl border border-[#00fff5]/40 bg-[#1a0b3d]/40 backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(0,255,245,0.3)]"
          style={{
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.5), 0 0 30px rgba(0,255,245,0.1), inset 0 0 20px rgba(255,255,255,0.05)",
          }}
        >
          <p className="text-gray-300/90 leading-relaxed">
            Got a project in mind or just want to say hi? Reach out through
            any of these, or send a message directly from the form.
          </p>

          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3 text-[#00fff5] hover:text-[#ff2e88] transition-colors"
          >
            {icons.mail}
            <span>{email}</span>
          </a>

          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-3 text-[#00fff5] hover:text-[#ff2e88] transition-colors"
          >
            {icons.phone}
            <span>{phone}</span>
          </a>

          <div className="flex gap-4 pt-2">
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-[#ff2e88]/40 text-[#ff2e88] hover:border-[#00fff5] hover:text-[#00fff5] hover:shadow-[0_0_15px_rgba(0,255,245,0.4)] transition-all"
                aria-label="GitHub"
              >
                {icons.github}
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-[#ff2e88]/40 text-[#ff2e88] hover:border-[#00fff5] hover:text-[#00fff5] hover:shadow-[0_0_15px_rgba(0,255,245,0.4)] transition-all"
                aria-label="LinkedIn"
              >
                {icons.linkedin}
              </a>
            )}
            {socials.twitter && (
              <a
                href={socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-[#ff2e88]/40 text-[#ff2e88] hover:border-[#00fff5] hover:text-[#00fff5] hover:shadow-[0_0_15px_rgba(0,255,245,0.4)] transition-all"
                aria-label="Twitter / X"
              >
                {icons.twitter}
              </a>
            )}
          </div>
        </div>

        {/* Right: direct email form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-2xl border border-[#ff2e88]/40 bg-[#1a0b3d]/40 backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,46,136,0.2)]"
          style={{
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.5), 0 0 30px rgba(255,46,136,0.1), inset 0 0 20px rgba(255,255,255,0.05)",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
            className={inputClasses}
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClasses}
          />
          <textarea
            name="message"
            placeholder="Your message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            className={inputClasses}
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className="cursor-pointer disabled:cursor-not-allowed mt-2 py-3 rounded-lg font-semibold uppercase tracking-widest text-[#0d0221] transition-all duration-300 disabled:opacity-60"
            style={{
              background: "linear-gradient(90deg, #00fff5, #ff2e88)",
              boxShadow: "0 0 20px rgba(255,46,136,0.4)",
            }}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "sent" && (
            <p className="text-[#00fff5] text-sm text-center">
              Message sent — thanks for reaching out!
            </p>
          )}
          {status === "error" && (
            <p className="text-[#ff2e88] text-sm text-center">
              Something went wrong. Please check your EmailJS setup, or email
              me directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}


