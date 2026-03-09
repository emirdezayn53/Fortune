"use client";

import { useState, useEffect } from "react";
import UploadZone from "@/components/UploadZone";
import ProcessingScreen from "@/components/ProcessingScreen";
import FortuneResult from "@/components/FortuneResult";
import ExampleImages from "@/components/ExampleImages";
import StarsBackground from "@/components/StarsBackground";

type AppState = "home" | "processing" | "result" | "limit";

const READING_LIMIT = 3;
const STORAGE_KEY = "fortune_readings_count";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("home");
  const [fortune, setFortune] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [readingsLeft, setReadingsLeft] = useState<number>(READING_LIMIT);

  useEffect(() => {
    const count = parseInt(localStorage.getItem(STORAGE_KEY) || "0");
    setReadingsLeft(Math.max(0, READING_LIMIT - count));
  }, []);

  const handleImageUpload = async (file: File) => {
    const count = parseInt(localStorage.getItem(STORAGE_KEY) || "0");
    if (count >= READING_LIMIT) {
      setAppState("limit");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setAppState("processing");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/fortune", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to get fortune reading");
      }

      const data = await response.json();
      const newCount = count + 1;
      localStorage.setItem(STORAGE_KEY, String(newCount));
      setReadingsLeft(Math.max(0, READING_LIMIT - newCount));
      setFortune(data.fortune);
      setAppState("result");
    } catch {
      setAppState("home");
      alert("Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setFortune("");
    setPreviewUrl("");
    const count = parseInt(localStorage.getItem(STORAGE_KEY) || "0");
    if (count >= READING_LIMIT) {
      setAppState("limit");
    } else {
      setAppState("home");
    }
  };

  return (
    <main className="relative min-h-screen bg-mystic-black overflow-hidden">
      <StarsBackground />

      {/* Background orbs */}
      <div className="orb w-96 h-96 bg-purple-900 top-[-10%] left-[-10%]" />
      <div className="orb w-80 h-80 bg-purple-700 bottom-[-10%] right-[-10%]" />
      <div className="orb w-64 h-64 bg-mystic-gold top-[50%] left-[50%] translate-x-[-50%]" style={{ opacity: 0.05 }} />

      <div className="relative z-10">
        {appState === "home" && (
          <HomePage
            onUpload={handleImageUpload}
            readingsLeft={readingsLeft}
          />
        )}
        {appState === "processing" && (
          <ProcessingScreen previewUrl={previewUrl} />
        )}
        {appState === "result" && (
          <FortuneResult
            fortune={fortune}
            previewUrl={previewUrl}
            readingsLeft={readingsLeft}
            onReset={handleReset}
          />
        )}
        {appState === "limit" && (
          <LimitReached onReset={() => {
            localStorage.removeItem(STORAGE_KEY);
            setReadingsLeft(READING_LIMIT);
            setAppState("home");
          }} />
        )}
      </div>
    </main>
  );
}

function HomePage({
  onUpload,
  readingsLeft,
}: {
  onUpload: (file: File) => void;
  readingsLeft: number;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12">
      {/* Header */}
      <header className="text-center mb-12 mt-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-4xl animate-float">🔮</span>
        </div>
        <h1 className="font-mystic text-3xl sm:text-4xl md:text-5xl font-bold gold-shimmer mb-4 leading-tight">
          AI Fortune Teller
        </h1>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-mystic-gold to-transparent mx-auto mb-6" />
        <p className="text-purple-200 text-lg sm:text-xl font-body italic max-w-md mx-auto">
          Upload your photo and discover what the universe holds for you
        </p>
      </header>

      {/* Readings counter */}
      <div className="mb-8 flex items-center gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full border border-mystic-gold transition-all duration-500 ${
              i < readingsLeft
                ? "bg-mystic-gold shadow-[0_0_8px_#d4af37]"
                : "bg-transparent opacity-30"
            }`}
          />
        ))}
        <span className="text-mystic-gold text-sm font-body ml-2">
          {readingsLeft} free reading{readingsLeft !== 1 ? "s" : ""} remaining
        </span>
      </div>

      {/* Upload Zone */}
      <div className="w-full max-w-lg mb-12">
        <UploadZone onUpload={onUpload} />
      </div>

      {/* Example images */}
      <ExampleImages />

      {/* Divider */}
      <div className="w-64 h-px bg-gradient-to-r from-transparent via-purple-700 to-transparent my-10" />

      {/* Footer */}
      <footer className="text-center text-purple-400 text-sm font-body">
        <p>✦ Powered by AI Vision ✦</p>
        <p className="mt-1 text-purple-500 text-xs">For entertainment purposes only</p>
      </footer>
    </div>
  );
}

function LimitReached({ onReset }: { onReset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl mb-6 animate-float">🌙</div>
      <h2 className="font-mystic text-3xl font-bold gold-shimmer mb-4">
        The Stars Have Spoken
      </h2>
      <div className="w-32 h-px bg-gradient-to-r from-transparent via-mystic-gold to-transparent mx-auto mb-6" />
      <p className="text-purple-200 text-lg font-body italic max-w-sm mb-4">
        You have received your 3 free readings from the cosmos.
      </p>
      <p className="text-purple-300 text-base font-body mb-10 max-w-sm">
        Unlock unlimited readings to continue your mystical journey through the stars.
      </p>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button className="w-full py-4 px-8 rounded-xl font-mystic text-lg font-bold bg-gradient-to-r from-mystic-gold-dark via-mystic-gold to-mystic-gold-light text-mystic-black glow-gold hover:scale-105 transition-all duration-300">
          ✦ Unlock Unlimited ✦
        </button>
        <button
          onClick={onReset}
          className="w-full py-3 px-6 rounded-xl font-body text-purple-300 border border-purple-800 hover:border-purple-600 hover:text-purple-200 transition-all duration-300 text-sm"
        >
          Reset Demo (for testing)
        </button>
      </div>
    </div>
  );
}
