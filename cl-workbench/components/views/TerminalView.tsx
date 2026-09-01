"use client";

import { useRef, useState } from "react";
import { PanelTitle } from "@/components/ResultPanel";
import { terminalResponses } from "@/lib/data";

type LogEntry = { type: "cmd" | "out"; text: string };

const initialLog: LogEntry[] = [
  { type: "cmd", text: "HELP" },
  { type: "out", text: terminalResponses.HELP },
];

export default function TerminalView() {
  const [log, setLog] = useState<LogEntry[]>(initialLog);
  const [input, setInput] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  const runCommand = () => {
    const raw = input.trim();
    if (!raw) return;
    const cmd = raw.toUpperCase();
    const output =
      terminalResponses[cmd] ??
      `Unknown command: '${raw}'. Type HELP for a list of commands.`;

    setLog((prev) => [...prev, { type: "cmd", text: raw }, { type: "out", text: output }]);
    setInput("");
    requestAnimationFrame(() => {
      if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
    });
  };

  return (
    <div>
      <PanelTitle>Interactive terminal</PanelTitle>
      <div
        ref={boxRef}
        className="bg-[#070a0e] border border-border rounded-md px-4 py-3 text-[12.5px] leading-[1.8] text-text-1 min-h-[340px] max-h-[440px] overflow-y-auto"
      >
        {log.map((entry, i) =>
          entry.type === "cmd" ? (
            <div key={i}>
              <span className="text-accent">christian_portfolio&gt;</span> {entry.text}
            </div>
          ) : (
            <div key={i} className="whitespace-pre-wrap text-text-1 mb-2">
              {entry.text}
            </div>
          )
        )}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-accent shrink-0">christian_portfolio&gt;</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runCommand()}
            autoComplete="off"
            placeholder="type a command..."
            className="flex-1 bg-transparent border-none text-text-0 outline-none text-[12.5px]"
          />
        </div>
      </div>
      <div className="text-[11px] text-text-2 mt-2.5">
        try: SHOW PROJECTS · SHOW SKILLS · SHOW QA · SHOW CONTACT
      </div>
    </div>
  );
}
