import { Geist, Geist_Mono } from "next/font/google";
import SmoothAnchorScroll from "./components/SmoothAnchorScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sebastián — Desarrollador Web",
  description:
    "Portafolio de desarrollo web de Sebastián. Proyectos modernos con foco en inteligencia artificial.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SmoothAnchorScroll />
        {children}
      </body>
    </html>
  );
}
