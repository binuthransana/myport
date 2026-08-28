import React, { useEffect, useState } from "react";


const defaultLines = [
  "Computer Science Undergraduate",
  "Developer",
  "Tech Enthusiast",
];

export default function RotatingTagline({
  lines = defaultLines,
  interval = 2800,
  className = "",
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % lines.length);
    }, interval);
    return () => clearInterval(id);
  }, [lines, interval]);

  return (
    <p
      className={`font-orbitron text-gray-300 text-lg md:text-xl max-w-lg mx-auto text-center min-h-[1.75em] ${className}`}
    >
      {/* the `key` forces React to remount this span on every change,
          which restarts the CSS animation from scratch each time */}
      <span key={index} className="inline-block animate-role-flicker">
        {lines[index]}
      </span>
    </p>
  );
}


