import type { Metadata } from "next";
import { Poppins, Aleo } from 'next/font/google';
import "./globals.css";

const poppins = Poppins({
  weight: ['400', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const aleo = Aleo({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-aleo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Pantheon Zero-Downtime Deployments",
  description: "Interactive demonstration of Pantheon's zero-downtime deployment orchestration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${aleo.variable}`}>
      <body className={`${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
