"use client";

import { useEffect, useState } from "react";
import ThemePicker from "@/components/ThemePicker";

export default function TopBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-bg-1 px-3 py-4 leading-none sm:px-5 lg:px-6">
      <div className="flex min-w-0 items-center gap-2 sm:gap-5">
        <div className="shrink-0 font-bold text-[17px] tracking-normal sm:text-[22px]">
          CL_<span className="text-accent">WORKBENCH</span>
        </div>
        <div className="truncate text-xs text-text-2 tracking-normal sm:text-[15px]">Database: christian_portfolio</div>
      </div>
      <div className="ml-auto flex items-center gap-2 text-xs text-text-1 tracking-normal sm:gap-5 sm:text-[15px]">
        <ThemePicker />
        <span>
          <span className="inline-block w-2 h-2 rounded-full bg-green mr-2" />
          Connected
        </span>
        <span suppressHydrationWarning>{time}</span>
      </div>
    </div>
  );
}
