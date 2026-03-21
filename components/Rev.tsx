"use client";

import { useRef, useState, useEffect, ReactNode } from "react";

interface RevProps {
  children: ReactNode;
  d?: number;
  y?: number;
}

export default function Rev({ children, d = 0, y = 40 }: RevProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);

  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          o.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : `translateY(${y}px)`,
        transition: `opacity .85s cubic-bezier(.16,1,.3,1) ${d}ms, transform .85s cubic-bezier(.16,1,.3,1) ${d}ms`,
      }}
    >
      {children}
    </div>
  );
}
