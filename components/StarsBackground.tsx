"use client";

import { useMemo } from "react";

export default function StarsBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: `${Math.random() * 4 + 2}s`,
      delay: `${Math.random() * 4}s`,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, []);

  return (
    <div className="stars-bg">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            "--duration": star.duration,
            "--delay": star.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
