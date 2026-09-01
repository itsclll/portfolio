export function ResultPanel({
  label,
  meta,
  children,
}: {
  label: string;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 overflow-hidden border border-border bg-bg-0">
      <div className="flex items-center justify-between border-b border-border bg-bg-1 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-text-2">
        <span>{label}</span>
        {meta && <span className="text-green">{meta}</span>}
      </div>
      {children}
    </div>
  );
}

export function Grid({
  headers,
  rows,
  fixedColumns = true,
}: {
  headers: string[];
  rows: React.ReactNode[][];
  fixedColumns?: boolean;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-fixed border-collapse text-[12.5px]">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className={`bg-bg-2 px-3 py-2 text-left text-[10px] uppercase tracking-[0.14em] text-text-2 ${
                  fixedColumns && headers.length === 2 && h === headers[0] ? "w-1/4" : ""
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="bg-bg-0">
              {row.map((cell, j) => (
                <td key={j} className="break-words border-b border-bg-2 px-3 py-2 text-text-1">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PanelTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-text-2">
      {children}
    </div>
  );
}
