"use client";

const EXAMPLES = [
  {
    emoji: "☕",
    title: "Coffee Cup",
    description: "Turkish coffee fortune reading from the sediment patterns",
    color: "from-amber-900/30 to-amber-950/50",
    border: "border-amber-800/40 hover:border-amber-600/60",
  },
  {
    emoji: "✋",
    title: "Palm Reading",
    description: "Discover your life path through the lines of your hand",
    color: "from-pink-900/30 to-pink-950/50",
    border: "border-pink-800/40 hover:border-pink-600/60",
  },
  {
    emoji: "🃏",
    title: "Tarot Cards",
    description: "Reveal hidden truths through the ancient tarot symbolism",
    color: "from-indigo-900/30 to-indigo-950/50",
    border: "border-indigo-800/40 hover:border-indigo-600/60",
  },
];

export default function ExampleImages() {
  return (
    <div className="w-full max-w-2xl">
      <p className="text-center text-purple-400 font-body text-sm italic mb-6">
        — Upload any of these for a mystical reading —
      </p>
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {EXAMPLES.map((example) => (
          <div
            key={example.title}
            className={`
              rounded-xl border p-4 text-center
              bg-gradient-to-b ${example.color}
              ${example.border}
              transition-all duration-300 hover:scale-105
              cursor-default
            `}
          >
            <div className="text-3xl sm:text-4xl mb-2">{example.emoji}</div>
            <h3 className="font-mystic text-xs sm:text-sm text-purple-200 font-bold mb-1">
              {example.title}
            </h3>
            <p className="text-purple-400 text-xs font-body leading-tight hidden sm:block">
              {example.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
