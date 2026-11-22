import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NoPortão — Pontualidade no Transporte Escolar",
  description: "O fim da espera no ponto e da culpa injusta. Gestão de rotas, telemetria de embarque e relatórios de pontualidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased selection:bg-brand-amber selection:text-brand-navy">
        {children}
      </body>
    </html>
  );
}
