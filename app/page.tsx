"use client";

import { useState, useEffect } from "react";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Interests from "@/components/Interests";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { ThemeProvider, useT } from "@/lib/ThemeContext";

function PageContent() {
  const D = useT();
  const [sec, setSec] = useState("hero");

  useEffect(() => {
    const ids = ["hero", "skills", "experience", "education", "interests", "contact"];
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            // "interests" has no nav link — highlight "education" instead
            const id = e.target.id === "interests" ? "education" : e.target.id;
            setSec(id);
          }
        }),
      { threshold: 0.15, rootMargin: "-20% 0px -60% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: D.bg0, minHeight: "100vh" }}>
      <Cursor />
      <Nav sec={sec} />
      <Hero />
      <Skills />
      <Experience />
      <Education />
      <Interests />
      <Contact />
      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <ThemeProvider>
      <PageContent />
    </ThemeProvider>
  );
}
