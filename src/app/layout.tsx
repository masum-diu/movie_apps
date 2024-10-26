import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // Check this path
import Providers from "./Providers"; // Ensure this path is correct

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie App",
  description: "This is a Movie database",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="max-w-screen-xl mx-auto px-5 py-2">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
