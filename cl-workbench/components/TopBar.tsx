"use client";

import { useEffect, useState } from "react";
import ThemePicker from "@/components/ThemePicker";

export default function TopBar({
  onToggleSidebar,
}: {
  onToggleSidebar?: () => void;
}) {
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
    <div className="border-b border-border bg-bg-1 px-3 py-3 leading-none sm:px-5 lg:px-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <div className="truncate text-[14px] font-bold tracking-normal sm:text-[18px] lg:text-[22px]">
            CL_<span className="text-accent">WORKBENCH</span>
          </div>
          <div className="truncate text-[10px] text-text-2 sm:text-[12px] lg:text-[15px]">
            Database: christian_portfolio
          </div>
          <div className="flex items-center gap-2 text-[10px] text-text-1 sm:hidden">
            <span className="inline-flex items-center whitespace-nowrap">
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-green" />
              Connected
            </span>
            <span suppressHydrationWarning className="tabular-nums whitespace-nowrap">
              {time}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
          className="flex h-8 w-8 items-center justify-center border border-border bg-bg-2 text-text-1 transition-colors md:hidden md:hover:border-accent md:hover:text-text-0"
        >
          <span className="flex flex-col gap-[4px]">
            <span className="block h-0.5 w-4 bg-current" />
            <span className="block h-0.5 w-4 bg-current" />
            <span className="block h-0.5 w-4 bg-current" />
          </span>
        </button>

        <div className="hidden items-center gap-2 text-[10px] text-text-1 sm:flex sm:gap-4 sm:text-[12px] lg:text-[15px]">
          <ThemePicker />
          <span className="inline-flex items-center whitespace-nowrap">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green" />
            Connected
          </span>
          <span suppressHydrationWarning className="tabular-nums whitespace-nowrap">
            {time}
          </span>
        </div>
      </div>
    </div>
  );
}
