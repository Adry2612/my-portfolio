import type { Metadata } from "next";
import "./globals.css";
import { GeneralSansRegular } from "./fonts";


export const metadata: Metadata = {
  title: "Portfolio de Adrián Vidal",
  description: "Esto es el portfolio de Adrián Vidal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={GeneralSansRegular.className}>{children}</body>
    </html>
  );
}
