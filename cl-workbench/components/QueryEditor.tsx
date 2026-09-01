export default function QueryEditor({ lines }: { lines: React.ReactNode[] }) {
  return (
    <div className="bg-bg-1 border border-border rounded-md px-4 py-3.5 mb-4">
      {lines.map((line, i) => (
        <div key={i} className="flex gap-3.5">
          <span className="text-text-2 w-3.5 text-right select-none">{i + 1}</span>
          <span>{line}</span>
        </div>
      ))}
      <div className="flex items-center gap-2.5 mt-3.5">
        <button className="bg-accent border border-accent text-bg-0 font-semibold text-xs px-3.5 py-1.5 rounded">
          ▸ Run query
        </button>
        <button className="border border-border bg-bg-2 text-text-1 text-xs px-3.5 py-1.5 rounded">
          Format
        </button>
      </div>
    </div>
  );
}

export const kw = (s: string) => <span className="text-accent">{s}</span>;
export const fn = (s: string) => <span className="text-purple">{s}</span>;
export const str = (s: string) => <span className="text-string">{s}</span>;
