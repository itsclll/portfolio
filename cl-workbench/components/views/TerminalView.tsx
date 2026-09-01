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

  const normalizeCommand = (value: string) =>
    value.trim().replace(/;\s*$/, "").replace(/\s+/g, " ").toUpperCase();

  const resolveCommandOutput = (raw: string) => {
    const normalized = normalizeCommand(raw);

    if (normalized === "CLEAR" || normalized === "CLS") {
      return "";
    }

    if (terminalResponses[normalized]) {
      return terminalResponses[normalized];
    }

    const underscoreKey = normalized.replace(/\s+/g, "_");
    if (terminalResponses[underscoreKey]) {
      return terminalResponses[underscoreKey];
    }

    const selectMatch = raw.trim().match(/^SELECT\s+\*\s+FROM\s+([A-Z_]+)\s*;?$/i);
    if (selectMatch) {
      const table = selectMatch[1].toUpperCase();
      const showQuery = `SHOW ${table}`;
      if (terminalResponses[showQuery]) {
        return terminalResponses[showQuery];
      }
    }

    return `Unknown command: '${raw}'. Type HELP for a list of commands.`;
  };

  const runCommand = () => {
    const raw = input.trim();
    if (!raw) return;

    const normalized = normalizeCommand(raw);
    if (normalized === "CLEAR" || normalized === "CLS") {
      setLog([]);
      setInput("");
      return;
    }

    const output = resolveCommandOutput(raw);

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
        try: SELECT * FROM PROJECTS · SELECT * FROM SKILLS · SELECT * FROM QA · SELECT * FROM PROFILE · HELP · CLEAR / CLS
      </div>
    </div>
  );
}
