import type { Metadata } from "next";
import "../src/index.css";
import "../src/variables.css";

export const metadata: Metadata = {
  title: "Curripulum - Crea tu currículum fácilmente",
  description: "Crea tu currículum",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
