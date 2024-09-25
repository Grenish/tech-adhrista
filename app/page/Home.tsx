"use client";

import React, { useState, useEffect } from "react";

interface BruteForceTextProps {
  text: string;
  className?: string;
  delay?: number;
}

function BruteForceText({
  text,
  className,
  delay = 0,
}: BruteForceTextProps): JSX.Element {
  const [displayedText, setDisplayedText] = useState("");
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>/?";
  const duration = 1000;
  const interval = 50;

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const startTime = Date.now() + delay;

    function updateText() {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      if (elapsed < 0) {
        timeoutId = setTimeout(updateText, -elapsed);
        return;
      }

      const progress = elapsed / duration;

      if (progress >= 1) {
        setDisplayedText(text);
        return;
      }

      const revealedLength = Math.floor(progress * text.length);
      let newText = text.substring(0, revealedLength);

      for (let i = revealedLength; i < text.length; i++) {
        newText += chars[Math.floor(Math.random() * chars.length)];
      }

      setDisplayedText(newText);
      timeoutId = setTimeout(updateText, interval);
    }

    updateText();
    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [text, delay]);

  return <span className={className}>{displayedText}</span>;
}

export default function Hero(): JSX.Element {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative text-white backdrop-blur-sm">
      <div className="cursor-default">
        <h2 className="techno-regular pointer-events-none mb-10">
          <BruteForceText text="Powered by NEXUS" />
        </h2>
      </div>
      <div className="pointer-events-none cursor-default">
        <h1 className="Tech text-5xl pointer-events-auto">
          <BruteForceText text="TECH" delay={500} />
        </h1>
        <h1 className="Tech caption-top text-9xl pointer-events-auto">
          <BruteForceText text="ADRISHTA" delay={1000} />
        </h1>
        <h2 className="Tech text-3xl text-end -mt-7 pointer-events-auto">
          <BruteForceText text="2024" delay={1500} />
        </h2>
      </div>
      <div className="mt-10 cursor-default text-center">
        <h1 className="text-xl capitalize techno-semibold pointer-events-none">
          <BruteForceText text="Biggest Tech Fest of North East" delay={2000} />
        </h1>
        <div className="glass rounded-xl p-2 mt-5">
          <h2 className="techno-regular text-xl capitalize">
            <BruteForceText text="Starting this September" delay={2500} />
          </h2>
          <ul className="flex justify-evenly mt-2 techno-semibold">
            <li className="text-3xl">
              <BruteForceText text="27" delay={3000} />
            </li>
            <li className="text-3xl">
              <BruteForceText text="28" delay={3500} />
            </li>
            <li className="text-3xl">
              <BruteForceText text="29" delay={4000} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}