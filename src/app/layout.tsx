import type { Metadata } from 'next';
import './globals.css';
import { GeneralSansRegular } from './fonts';

export const metadata: Metadata = {
  title: 'Adrián Vidal · Desarrollador frontend (React y TypeScript)',
  description:
    'Desarrollador frontend en Valencia, especializado en React, TypeScript y sistemas de diseño accesibles. Rendimiento web con impacto medido en conversión.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='es'
      className='h-full'
    >
      <body className={GeneralSansRegular.className}>{children}</body>
    </html>
  );
}
