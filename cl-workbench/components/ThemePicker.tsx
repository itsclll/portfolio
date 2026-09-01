"use client";

import { useEffect, useState } from "react";
import { themes, type ThemeId } from "@/lib/themes";

const storageKey = "cl-workbench-theme";

export default function ThemePicker() {
  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemeId>("dark");

  const applyTheme = (themeId: ThemeId) => {
    const theme = themes.find((item) => item.id === themeId) ?? themes[0];
    document.documentElement.dataset.theme = theme.id;
    localStorage.setItem(storageKey, theme.id);
    setActiveTheme(theme.id);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as ThemeId | null;
    applyTheme(themes.some((theme) => theme.id === savedTheme) ? savedTheme! : "dark");
  }, []);

  const selectedTheme = themes.find((theme) => theme.id === activeTheme) ?? themes[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="border border-border bg-bg-2 px-3 py-1.5 text-xs text-text-1 transition-colors md:hover:border-accent md:hover:text-text-0"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        Themes
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 border border-border bg-bg-1 p-2 shadow-2xl">
          <div className="flex items-center justify-between border-b border-border px-2 pb-2 text-xs text-text-0">
            <span>Themes</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-1 text-text-2 md:hover:text-text-0"
              aria-label="Close theme menu"
            >
              x
            </button>
          </div>
          <div className="pt-2" role="listbox" aria-label="Color themes">
            {themes.map((theme) => (
              <button
                key={theme.id}
                type="button"
                role="option"
                aria-selected={selectedTheme.id === theme.id}
                onClick={() => {
                  applyTheme(theme.id);
                  setOpen(false);
                }}
                className={`block w-full px-2 py-1.5 text-left text-xs transition-colors ${
                  selectedTheme.id === theme.id
                    ? "bg-accent text-bg-0"
                    : "text-text-1 md:hover:bg-bg-2 md:hover:text-text-0"
                }`}
              >
                {theme.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
