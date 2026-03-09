"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const MESSAGES = [
  "Peering into the cosmic veil...",
  "Reading the ancient symbols...",
  "Consulting the stars above...",
  "The universe is whispering...",
  "Unraveling the threads of fate...",
  "Your destiny is taking shape...",
];

interface ProcessingScreenProps {
  previewUrl: string;
}

export default function ProcessingScreen({ previewUrl }: ProcessingScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 2500);
    return () => clearInterval(msgTimer);
  }, []);

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 500);
    return () => clearInterval(dotTimer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Image preview with mystic overlay */}
      {previewUrl && (
        <div className="relative w-40 h-40 rounded-2xl overflow-hidden mb-8 border-2 border-purple-700 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
          <Image
            src={previewUrl}
            alt="Uploaded image"
            fill
            className="object-cover"
          />
          {/* Scanning overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-purple-900/20" />
          <div
            className="absolute left-0 right-0 h-0.5 bg-mystic-gold/60 shadow-[0_0_10px_#d4af37]"
            style={{
              animation: "scan 2s ease-in-out infinite",
            }}
          />
          <style jsx>{`
            @keyframes scan {
              0% { top: 0; }
              50% { top: 100%; }
              100% { top: 0; }
            }
          `}</style>
        </div>
      )}

      {/* Orbital animation */}
      <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
        {/* Center orb */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mystic-gold to-purple-600 shadow-[0_0_20px_rgba(212,175,55,0.6)] animate-pulse" />

        {/* Orbiting dots */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full rounded-full border border-purple-800/40 animate-spin-slow" />
        </div>
        <div className="absolute w-2 h-2 rounded-full bg-mystic-gold shadow-[0_0_8px_#d4af37] animate-orbit-1" />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_#a855f7] animate-orbit-2" />
        <div className="absolute w-1 h-1 rounded-full bg-purple-300 animate-orbit-3" />
      </div>

      <h2 className="font-mystic text-2xl sm:text-3xl font-bold gold-shimmer mb-4">
        Your Fortune is Being Revealed
      </h2>
      <div className="w-32 h-px bg-gradient-to-r from-transparent via-mystic-gold to-transparent mx-auto mb-6" />

      <p className="text-purple-200 font-body text-lg italic min-h-[2rem] transition-all duration-500">
        {MESSAGES[messageIndex]}{dots}
      </p>

      <p className="text-purple-500 font-body text-sm mt-6">
        This may take a few moments
      </p>
    </div>
  );
}
