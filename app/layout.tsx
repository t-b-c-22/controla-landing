import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-albert-sans",
});

export const metadata: Metadata = {
  title: "Controlá - Tu hotel en piloto automático",
  description:
    "Controlá digitaliza la infraestructura de tu hotel. Aprovechamos lo que ya tenés y completamos lo que falta. Climatización, operativa, prevención de incidencias y control de acceso en piloto automático.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={albertSans.variable} style={{ colorScheme: "light" }}>
      <body className={albertSans.className}>{children}</body>
    </html>
  );
}
