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
    <div className="border border-border rounded-md overflow-visible mb-4">
      <div className="flex justify-between px-3.5 py-2 bg-bg-1 border-b border-border text-[11px]">
        <span className="text-text-2">{label}</span>
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
    <div className="w-full overflow-visible">
      <table className="w-full table-fixed border-collapse text-[12.5px]">
      <thead>
        <tr>
          {headers.map((h) => (
            <th
              key={h}
              className={`text-left px-3 py-2 bg-bg-2 text-text-2 border-b border-border font-medium ${
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
          <tr key={i}>
            {row.map((cell, j) => (
              <td
                key={j}
                className="break-words px-3 py-2 border-b border-bg-2 text-text-1"
              >
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
    <div className="text-[11px] text-text-2 tracking-wide uppercase mb-2.5">
      {children}
    </div>
  );
}
