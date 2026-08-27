import React, { useEffect, useRef, useState } from "react";

/**
 * CursorTrail
 * A soft, blurred glow that follows the mouse with a slight lag —
 * two layered blurred orbs (cyan + pink) instead of a sharp line
 * trail, giving a hazy neon-glow feel. Auto-disables on touch
 * devices (no cursor to follow).
 *
 * Usage in App.jsx — mount once, near the top level, above everything:
 *
 *   <div className="relative min-h-screen bg-[#0d0221] overflow-hidden">
 *     <SynthwaveBackground hue={hueMap[activeId] ?? 0} />
 *     <CursorTrail />
 *     {loading && <LoadingScreen ... />}
 *     <div className="relative z-10"> ...rest of your page... </div>
 *   </div>
 *
 * `pointer-events-none` + very high z-index, so it never blocks
 * clicks and always renders above your content.
 */
export default function CursorTrail({
  outerSize = 90,
  innerSize = 40,
  outerBlur = 35,
  innerBlur = 20,
  outerEase = 0.08, // lower = laggier / softer trailing
  innerEase = 0.18, // higher = tighter to the actual cursor
}) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const rafRef = useRef(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const innerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mq.matches);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const handleMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMove);

    const lerp = (start, end, t) => start + (end - start) * t;

    const render = () => {
      outerPos.current.x = lerp(outerPos.current.x, mouse.current.x, outerEase);
      outerPos.current.y = lerp(outerPos.current.y, mouse.current.y, outerEase);
      innerPos.current.x = lerp(innerPos.current.x, mouse.current.x, innerEase);
      innerPos.current.y = lerp(innerPos.current.y, mouse.current.y, innerEase);

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${
          outerPos.current.x - outerSize / 2
        }px, ${outerPos.current.y - outerSize / 2}px, 0)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${
          innerPos.current.x - innerSize / 2
        }px, ${innerPos.current.y - innerSize / 2}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isFinePointer, outerEase, innerEase, outerSize, innerSize]);

  if (!isFinePointer) return null;

  return (
    <div className="fixed inset-0 z-9999 pointer-events-none overflow-hidden">
      {/* outer, softer, laggier glow — pink */}
      <div
        ref={outerRef}
        className="absolute top-0 left-0 rounded-full mix-blend-screen"
        style={{
          width: outerSize,
          height: outerSize,
          background:
            "radial-gradient(circle, rgba(255,46,136,0.55) 0%, rgba(255,46,136,0) 70%)",
          filter: `blur(${outerBlur}px)`,
        }}
      />
      {/* inner, tighter glow — cyan */}
      <div
        ref={innerRef}
        className="absolute top-0 left-0 rounded-full mix-blend-screen"
        style={{
          width: innerSize,
          height: innerSize,
          background:
            "radial-gradient(circle, rgba(0,255,245,0.6) 0%, rgba(0,255,245,0) 70%)",
          filter: `blur(${innerBlur}px)`,
        }}
      />
    </div>
  );
}

/*
=====================================================================
HOW IT WORKS
=====================================================================
- Two absolutely-positioned divs, each a radial gradient blob run
  through a CSS `blur()` filter — no canvas, no sharp lines.
- Each frame, their positions ease toward the real cursor position
  via linear interpolation (lerp), at different speeds:
    - the pink "outer" blob eases slowly (outerEase=0.08), so it
      trails further behind and reads as a soft haze
    - the cyan "inner" blob eases faster (innerEase=0.18), staying
      closer to the actual cursor
  The gap between the two as you move is what creates the blurred
  trailing look, rather than a fixed-shape trail.
- `mix-blend-mode: screen` makes the glows brighten what's underneath
  instead of sitting as flat colored circles, so they read as light
  rather than paint — especially against your dark background.
- Auto-disables on touch devices via `(pointer: fine)`.
- Tune the feel:
    outerSize/innerSize -> how big the blobs are
    outerBlur/innerBlur -> how soft/hazy they look
    outerEase/innerEase -> lower = laggier & softer trail,
                            higher = snappier & tighter to cursor
*/