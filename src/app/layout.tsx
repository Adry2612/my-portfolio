import type { Metadata } from "next";
import "./globals.css";
import { work_sans } from "./fonts";


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
      <body className={work_sans.className}>{children}</body>
    </html>
  );
}
