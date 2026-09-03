import { useState } from "react";
import QueryEditor, { kw, fn, str } from "@/components/QueryEditor";
import { ResultPanel, Grid, PanelTitle } from "@/components/ResultPanel";
import Badge from "@/components/Badge";
import { testCases, bugTicket } from "@/lib/data";

export default function QALabView() {
  const [hasRun, setHasRun] = useState(false);

  return (
    <div>
      <PanelTitle>SQL editor</PanelTitle>
      <QueryEditor
        onRun={() => setHasRun(true)}
        formattedQuery="SELECT * FROM test_cases WHERE project = 'FIDS';"
        lines={[
          <>
            {kw("SELECT")} * {kw("FROM")} {fn("test_cases")}
          </>,
          <>
            {kw("WHERE")} project {kw("=")} {str("'FIDS'")};
          </>,
        ]}
      />

      {hasRun && <ResultPanel label="Test cases" meta={`${testCases.length} rows`}>
        <Grid
          headers={["id", "case", "status"]}
          rows={testCases.map((t) => [
            t.id,
            t.name,
            <Badge kind={t.status === "PASSED" ? "pass" : "fixed"} key={t.id}>
              {t.status === "PASSED" ? "PASSED" : "FAILED → FIXED"}
            </Badge>,
          ])}
        />
      </ResultPanel>}

      <PanelTitle>Bug report</PanelTitle>
      <div className="border border-border rounded-md bg-bg-1 px-5 py-4.5">
        <div className="flex justify-between items-center mb-3.5 pb-3 border-b border-border">
          <span className="text-accent font-semibold text-[13.5px]">{bugTicket.id}</span>
          <Badge kind="fixed">{bugTicket.status}</Badge>
        </div>
        <Field label="Project" value={bugTicket.project} />
        <Field label="Severity" value={<span className="text-red font-semibold">{bugTicket.severity}</span>} />
        <Field label="Description" value={bugTicket.description} />
        <div className="mb-3">
          <div className="text-[10px] text-text-2 uppercase tracking-wider mb-1">Investigation</div>
          <div>
            {bugTicket.investigation.map((step) => (
              <div key={step} className="text-[12.5px] text-text-1 py-0.5">
                <span className="text-green">✓</span> {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="mb-3">
      <div className="text-[10px] text-text-2 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-[13px] text-text-0">{value}</div>
    </div>
  );
}
