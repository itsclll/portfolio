"use client";

import { useEffect, useRef, useState } from "react";
import { resolvePortfolioQuery } from "@/lib/data";

export type QueryRun = { query: string; output: string };

export default function QueryEditor({
  lines,
  onRun,
  formattedLines,
  formattedQuery,
  explanation,
}: {
  lines: React.ReactNode[];
  onRun?: (result: QueryRun | null) => void;
  formattedLines?: React.ReactNode[];
  formattedQuery?: string;
  explanation?: string;
}) {
  const [isFormatted, setIsFormatted] = useState(false);
  const [query, setQuery] = useState(formattedQuery ?? "");
  const [error, setError] = useState("");
  const hasAutoRun = useRef(false);
  const displayedLines = isFormatted && formattedQuery
    ? []
    : isFormatted && formattedLines
      ? formattedLines
      : lines;
  const canFormat = Boolean(formattedQuery || formattedLines);

  useEffect(() => {
    if (hasAutoRun.current || !formattedQuery) return;

    hasAutoRun.current = true;
    const output = resolvePortfolioQuery(formattedQuery);
    if (output) onRun?.({ query: formattedQuery, output });
  }, [formattedQuery, onRun]);

  const runQuery = () => {
    const queryToRun = isFormatted ? query : formattedQuery ?? "";
    const output = resolvePortfolioQuery(queryToRun);

    if (!output) {
      setError("Unknown or invalid query. Use a query supported by the interactive terminal.");
      onRun?.(null);
      return;
    }

    setError("");
    onRun?.({ query: queryToRun, output });
  };

  return (
    <div className="mb-4 overflow-hidden border border-border bg-bg-0">
      <div className="flex items-center justify-between border-b border-border bg-bg-1 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-text-2">
        <span>SQL editor</span>
      </div>

      <div className="bg-bg-0 px-3 py-3 font-['JetBrains_Mono',monospace] text-[12.5px] leading-[1.9] text-text-0">
        {isFormatted && formattedQuery ? (
          <textarea
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setError("");
            }}
            aria-label="Editable SQL query"
            aria-invalid={Boolean(error)}
            rows={Math.max(2, query.split("\n").length)}
            className="block min-h-[3.5rem] w-full resize-y bg-transparent text-text-0 outline-none"
          />
        ) : (
          displayedLines.map((line, i) => (
            <div key={i} className="flex min-h-[1.5em] items-center">
              <span>{line}</span>
            </div>
          ))
        )}
      </div>
      {explanation && (
        <div className="border-t border-border bg-bg-1 px-3 py-2 text-[10.5px] leading-relaxed text-text-2">
          <span className="mr-1.5 font-medium uppercase tracking-[0.12em] text-accent">About this query</span>
          {explanation}
        </div>
      )}

      <div className="flex items-center gap-2 border-t border-border bg-bg-1 px-3 py-2.5">
        <button
          type="button"
          onClick={runQuery}
          className="rounded border border-accent bg-accent px-3 py-1.5 text-[11px] font-medium text-bg-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        >
          ▸ Run query
        </button>
        <button
          type="button"
          onClick={() => {
            setQuery(formattedQuery ?? query);
            setIsFormatted(true);
            setError("");
          }}
          disabled={!canFormat}
          className="rounded border border-border bg-bg-2 px-3 py-1.5 text-[11px] text-text-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Format
        </button>
        <button
          type="button"
          onClick={() => setIsFormatted(false)}
          disabled={!isFormatted}
          className="rounded border border-border bg-bg-2 px-3 py-1.5 text-[11px] text-text-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Original
        </button>
      </div>
      <p className="border-t border-border bg-bg-0 px-3 py-2 text-[10.5px] leading-relaxed text-text-2">
        <span className="text-text-1">Run query</span> executes the SQL. Use <span className="text-text-1">Format</span> to edit it, then run any supported query. <span className="text-text-1">Original</span> restores the displayed query.
      </p>
      {error && (
        <p role="alert" className="border-t border-red/30 bg-red/10 px-3 py-2 text-[11px] text-red">
          {error}
        </p>
      )}
    </div>
  );
}

export const kw = (s: string) => <span className="text-accent font-semibold">{s}</span>;
export const fn = (s: string) => <span className="text-purple">{s}</span>;
export const str = (s: string) => <span className="text-string">{s}</span>;
