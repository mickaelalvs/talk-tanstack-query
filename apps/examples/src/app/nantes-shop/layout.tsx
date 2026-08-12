import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type React from "react";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spécialités de Bordeaux - Boutique en ligne",
  description:
    "Découvrez les meilleures spécialités bordelaises : Cannelé, Saint-Émilion, Huîtres d'Arcachon, Foie gras et bien plus encore.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}
