"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

interface FortuneResultProps {
  fortune: string;
  previewUrl: string;
  readingsLeft: number;
  onReset: () => void;
}

export default function FortuneResult({
  fortune,
  previewUrl,
  readingsLeft,
  onReset,
}: FortuneResultProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showActions, setShowActions] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText("");
    setIsTyping(true);
    setShowActions(false);

    // Typing effect — reveal 3 characters per tick for speed
    intervalRef.current = setInterval(() => {
      if (indexRef.current < fortune.length) {
        const chunkSize = 3;
        const end = Math.min(indexRef.current + chunkSize, fortune.length);
        setDisplayedText(fortune.slice(0, end));
        indexRef.current = end;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsTyping(false);
        setTimeout(() => setShowActions(true), 400);
      }
    }, 25);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fortune]);

  const handleShare = async () => {
    const shareText = `✨ My AI Fortune Reading ✨\n\n${fortune.slice(0, 280)}...\n\n🔮 Get your reading at AI Fortune Teller`;
    try {
      if (navigator.share) {
        await navigator.share({ text: shareText, title: "My AI Fortune Reading" });
      } else {
        await navigator.clipboard.writeText(shareText);
        toast.success("Fortune copied to clipboard! ✨");
      }
    } catch {
      // User cancelled share
    }
  };

  const skipTyping = () => {
    if (isTyping) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayedText(fortune);
      setIsTyping(false);
      setTimeout(() => setShowActions(true), 200);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8 mt-4">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-2xl animate-float">✨</span>
          <h2 className="font-mystic text-2xl sm:text-3xl font-bold gold-shimmer">
            Your Fortune
          </h2>
          <span className="text-2xl animate-float" style={{ animationDelay: "0.5s" }}>✨</span>
        </div>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-mystic-gold to-transparent mx-auto" />
      </div>

      {/* Uploaded image */}
      {previewUrl && (
        <div className="relative w-24 h-24 rounded-xl overflow-hidden mb-6 border border-purple-700 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
          <Image src={previewUrl} alt="Your image" fill className="object-cover" />
        </div>
      )}

      {/* Fortune text card */}
      <div
        className="w-full max-w-2xl rounded-2xl border border-purple-800 glow-border
          bg-gradient-to-b from-purple-950/40 to-mystic-dark/60
          p-6 sm:p-8 mb-8 cursor-pointer"
        onClick={skipTyping}
        title={isTyping ? "Click to reveal all" : undefined}
      >
        {/* Decorative corner ornaments */}
        <div className="absolute top-3 left-3 text-mystic-gold/30 text-lg select-none">✦</div>
        <div className="absolute top-3 right-3 text-mystic-gold/30 text-lg select-none">✦</div>

        <div className="relative">
          <p className="font-body text-lg sm:text-xl text-purple-100 leading-relaxed whitespace-pre-line">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-0.5 h-5 bg-mystic-gold ml-0.5 align-middle animate-pulse" />
            )}
          </p>

          {isTyping && (
            <p className="text-purple-500 text-xs mt-4 text-right font-body italic">
              Tap to skip...
            </p>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div
        className={`flex flex-col sm:flex-row gap-4 w-full max-w-sm transition-all duration-700 ${
          showActions ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl
            border border-mystic-gold text-mystic-gold
            hover:bg-mystic-gold/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]
            font-body text-base transition-all duration-300"
        >
          <span>🌟</span>
          <span>Share Fortune</span>
        </button>

        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl
            bg-gradient-to-r from-purple-900 to-purple-700
            border border-purple-500 hover:border-purple-400
            text-purple-100 hover:text-white
            font-body text-base transition-all duration-300
            hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
        >
          <span>🔮</span>
          <span>
            {readingsLeft > 0
              ? `New Reading (${readingsLeft} left)`
              : "Get Another Reading"}
          </span>
        </button>
      </div>

      {/* Readings counter */}
      {showActions && readingsLeft > 0 && (
        <p className="text-purple-500 text-xs font-body mt-4 text-center italic">
          {readingsLeft} free reading{readingsLeft !== 1 ? "s" : ""} remaining
        </p>
      )}

      {showActions && readingsLeft === 0 && (
        <div className="mt-4 text-center">
          <p className="text-mystic-gold text-sm font-body italic">
            ✦ You&apos;ve used all your free readings ✦
          </p>
          <button className="mt-3 px-6 py-2 rounded-lg bg-gradient-to-r from-mystic-gold-dark via-mystic-gold to-mystic-gold-light text-mystic-black font-mystic text-sm font-bold glow-gold hover:scale-105 transition-all duration-300">
            Unlock Unlimited Readings
          </button>
        </div>
      )}
    </div>
  );
}
