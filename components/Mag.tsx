"use client";

import { useRef, ReactNode } from "react";

interface MagProps {
  children: ReactNode;
  href: string;
  style?: React.CSSProperties;
}

export default function Mag({ children, href, style = {} }: MagProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const b = ref.current.getBoundingClientRect();
        ref.current.style.transform = `translate(${(e.clientX - b.left - b.width / 2) * 0.28}px,${(e.clientY - b.top - b.height / 2) * 0.28}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
      style={{
        cursor: "none",
        display: "inline-flex",
        alignItems: "center",
        transition: "transform .44s cubic-bezier(.16,1,.3,1)",
        textDecoration: "none",
        ...style,
      }}
    >
      {children}
    </a>
  );
}
