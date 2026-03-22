import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono, Roboto, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "MD. Nurul Amin — a Multidisciplinary Problem-Solver",
  description:
    "Portfolio of MD. Nurul Amin — a multidisciplinary problem-solver skilled in design, marketing, web development, education, finance, and product research. Turning ideas into impactful solutions.",
  keywords: [
    "Nurul Amin",
    "Portfolio",
    "Multidisciplinary",
    "Problem-Solver",
    "Designer",
    "Web Developer",
    "Marketing",
    "Finance",
    "Educator",
    "BCS Cadre",
    "Bangladesh",
  ],
  openGraph: {
    title: "MD. Nurul Amin — a Multidisciplinary Problem-Solver",
    description:
      "Explore the portfolio of MD. Nurul Amin — skilled in design, marketing, web development, education, and finance, focused on turning ideas into impactful solutions.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} ${roboto.variable} ${dmSerif.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: "#02050E" }}>{children}</body>
    </html>
  );
}
