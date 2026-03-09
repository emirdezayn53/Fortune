import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Fortune Teller — Reveal Your Destiny",
  description:
    "Upload a photo of your coffee cup, palm, or tarot card and receive a mystical AI-powered fortune reading.",
  openGraph: {
    title: "AI Fortune Teller",
    description: "Discover what the universe holds for you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#1a0a2e",
              color: "#f3e8ff",
              border: "1px solid #6b21a8",
              fontFamily: "'Crimson Text', serif",
              fontSize: "16px",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
