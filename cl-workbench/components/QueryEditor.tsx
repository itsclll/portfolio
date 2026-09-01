export default function QueryEditor({ lines }: { lines: React.ReactNode[] }) {
  return (
    <div className="mb-4 overflow-hidden border border-border bg-bg-0">
      <div className="flex items-center justify-between border-b border-border bg-bg-1 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-text-2">
        <span>SQL editor</span>
      </div>

      <div className="bg-bg-0 px-3 py-3 font-['JetBrains_Mono',monospace] text-[12.5px] leading-[1.9] text-text-0">
        {lines.map((line, i) => (
          <div key={i} className="flex min-h-[1.5em] items-center">
            <span>{line}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-border bg-bg-1 px-3 py-2.5">
        <button className="rounded border border-accent bg-accent px-3 py-1.5 text-[11px] font-medium text-bg-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
          ▸ Run query
        </button>
        <button className="rounded border border-border bg-bg-2 px-3 py-1.5 text-[11px] text-text-1">
          Format
        </button>
      </div>
    </div>
  );
}

export const kw = (s: string) => <span className="text-accent font-semibold">{s}</span>;
export const fn = (s: string) => <span className="text-purple">{s}</span>;
export const str = (s: string) => <span className="text-string">{s}</span>;
