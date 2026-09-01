"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { profile } from "@/lib/data";

const bootLines = [
  { t: "Connecting to christian_portfolio...", cls: "text-text-1", d: 400 },
  { t: "✓ Database connected", cls: "text-green", d: 350 },
  { t: "✓ Profile loaded", cls: "text-green", d: 300 },
  { t: "✓ Projects loaded", cls: "text-green", d: 300 },
  { t: "✓ Experience loaded", cls: "text-green", d: 300 },
  { t: "✓ QA records loaded", cls: "text-green", d: 300 },
  { t: "Connection established.", cls: "text-accent font-semibold", d: 400 },
];

export default function BootScreen({ onEnter }: { onEnter: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    let delay = 200;
    const timers: ReturnType<typeof setTimeout>[] = [];
    bootLines.forEach((line, i) => {
      delay += line.d;
      timers.push(setTimeout(() => setVisibleLines(i + 1), delay));
    });
    timers.push(setTimeout(() => setShowCard(true), delay + 300));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-[520px]">
        <div className="text-[11px] text-text-2 tracking-[0.1em] mb-4">
          MYSQL WORKBENCH
        </div>
        <div className="h-px bg-border mb-5" />
        <div className="text-[13px] leading-[1.9] text-text-1 min-h-[170px]">
          {bootLines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className={line.cls}>
              {line.t}
            </div>
          ))}
        </div>

        <div
          className={`mt-6 border border-border rounded-lg px-8 py-7 bg-bg-1 text-center transition-all duration-500 ${
            showCard ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="w-[84px] h-[84px] rounded-full overflow-hidden border-2 border-accent-dim mx-auto mb-4 relative bg-bg-2">
            {/* Replace /public/photo.jpg with your own photo */}
            <Image src={profile.photo} alt={profile.name} fill className="object-cover" />
          </div>
          <div className="text-[22px] font-bold tracking-wide mb-2.5">
            {profile.name.toUpperCase()}
          </div>
          <div className="text-[12.5px] text-accent leading-[1.9] mb-3.5">
            IT PROFESSIONAL
            <br />
            FULL-STACK DEVELOPER
            <br />
            QA ENGINEER
          </div>
          <div className="text-[11px] text-text-2 tracking-[0.12em] mb-5">
            BUILD • TEST • DEBUG • DEPLOY
          </div>
          <button
            onClick={onEnter}
            className="bg-accent md:hover:bg-[#5cb6ff] text-bg-0 font-bold text-[12.5px] tracking-wide px-6 py-2.5 rounded-md"
          >
            ▸ ENTER DATABASE
          </button>
        </div>
      </div>
    </div>
  );
}
