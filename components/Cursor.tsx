"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/ThemeContext";

export default function Cursor() {
  const D = useT();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let rx = 0, ry = 0;
    let tx = 0, ty = 0;
    let rafId: number;

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      }
    };

    const animate = () => {
      rx += (tx - rx) * 0.12;
      ry += (ty - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: D.teal,
          boxShadow: `0 0 12px ${D.teal}`,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          willChange: "transform",
        }}
      />
      {/* Lagging ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: `1px solid ${D.teal}66`,
          pointerEvents: "none",
          zIndex: 9998,
          opacity: visible ? 0.7 : 0,
          willChange: "transform",
          backdropFilter: "blur(2px)",
        }}
      />
    </>
  );
}
