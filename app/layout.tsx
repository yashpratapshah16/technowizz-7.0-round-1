import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterProvider from "@/Providers/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechnoWizz 7.0",
  description: "Round 1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
