// Color key type — resolved at render time via theme tokens
export type ColorKey = "teal" | "lavender" | "rose" | "emerald" | "amber";

export const SKILLS = [
  {
    cat: "Design & Creative",
    colKey: "rose" as ColorKey,
    icon: "palette",
    items: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Canva",
      "Visual Branding",
      "T-Shirt Design",
      "Creative Direction",
    ],
  },
  {
    cat: "Web & Technology",
    colKey: "teal" as ColorKey,
    icon: "code",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "WordPress",
      "Responsive Design",
    ],
  },
  {
    cat: "Digital Tools",
    colKey: "lavender" as ColorKey,
    icon: "build",
    items: [
      "PowerPoint",
      "Excel",
      "Adobe Premiere Pro",
      "CapCut",
      "Video Editing",
      "Content Creation",
    ],
  },
  {
    cat: "Business & Publishing",
    colKey: "emerald" as ColorKey,
    icon: "store",
    items: [
      "Amazon Affiliate",
      "Kindle Direct Publishing",
      "Print-on-Demand",
      "Merch by Amazon",
      "Blogging",
      "Digital Marketing",
    ],
  },
];

export const EXP = [
  {
    period: "2022 — Present",
    role: "Civil Service Officer",
    dept: "Lecturer in Accounting · 40th BCS Education Cadre",
    org: "Ministry of Education, People's Republic of Bangladesh",
    colKey: "teal" as ColorKey,
    pts: [
      "Building actionable and impactful visuals and web solutions for the internet.",
      "Developing course materials and delivering impactful, tech-integrated lectures.",
      "Joined as 40th BCS Education Cadre — among the most competitive civil service exams in Bangladesh.",
    ],
  },
  {
    period: "2021 — 2022",
    role: "Assistant Manager",
    dept: "Marketing & Value Added Services",
    org: "Teletalk Bangladesh Limited",
    colKey: "lavender" as ColorKey,
    pts: [
      "Drove marketing initiatives and telecom VAS campaigns.",
      "Supported digital service promotion strategies across the organization.",
      "Coordinated with technical teams to improve customer engagement.",
    ],
  },
  {
    period: "2017 — 2018",
    role: "Creative Designer & Copywriter",
    dept: "Branding & Marketing",
    org: "Horin Branding — Dhaka Based SME Agency",
    colKey: "rose" as ColorKey,
    pts: [
      "Partnered with SME entrepreneurs on brand identity and creative direction.",
      "Designed logos, social visuals, and promotional materials.",
      "Created engaging brand copy and campaign narratives for diverse clients.",
    ],
  },
  {
    period: "2014 — 2019",
    role: "Freelance Visualizer",
    dept: "T-Shirt Design · Graphic Arts",
    org: "Fiverr — Remote, Global Clients",
    colKey: "emerald" as ColorKey,
    pts: [
      "Designed creative graphics and custom T-shirt artwork for global clients.",
      "Developed brand visuals, merchandise designs, and marketing graphics.",
      "Delivered high-quality creative solutions with strong client satisfaction.",
    ],
  },
];
