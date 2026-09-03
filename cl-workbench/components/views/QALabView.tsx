import { useState } from "react";
import QueryEditor, { kw, fn, str } from "@/components/QueryEditor";
import QueryOutput from "@/components/QueryOutput";
import type { QueryRun } from "@/components/QueryEditor";
import { ResultPanel, Grid, PanelTitle } from "@/components/ResultPanel";
import Badge from "@/components/Badge";
import { normalizePortfolioQuery, testCases, bugTicket } from "@/lib/data";

export default function QALabView() {
  const [result, setResult] = useState<QueryRun | null>(null);
  const isTestCasesQuery = Boolean(result && normalizePortfolioQuery(result.query) === normalizePortfolioQuery("SELECT * FROM test_cases WHERE project = 'FIDS';"));

  return (
    <div>
      <PanelTitle>SQL editor</PanelTitle>
      <QueryEditor
        onRun={setResult}
        formattedQuery="SELECT * FROM test_cases WHERE project = 'FIDS';"
        explanation="Shows the FIDS test cases and their latest QA status."
        lines={[
          <>
            {kw("SELECT")} * {kw("FROM")} {fn("test_cases")}
          </>,
          <>
            {kw("WHERE")} project {kw("=")} {str("'FIDS'")};
          </>,
        ]}
      />

      {isTestCasesQuery && <ResultPanel label="Test cases" meta={`${testCases.length} rows`}>
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
      {result && !isTestCasesQuery && <QueryOutput result={result} />}

      <PanelTitle>Bug report</PanelTitle>
      <div className="rounded-md border border-border bg-bg-1 px-5 pb-5 pt-4">
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
