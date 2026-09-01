import QueryEditor, { kw, fn, str } from "@/components/QueryEditor";
import { ResultPanel, Grid, PanelTitle } from "@/components/ResultPanel";
import Badge from "@/components/Badge";
import { testCases, bugTicket } from "@/lib/data";

export default function QALabView() {
  return (
    <div>
      <PanelTitle>SQL editor</PanelTitle>
      <QueryEditor
        lines={[
          <>
            {kw("SELECT")} * {kw("FROM")} {fn("test_cases")}
          </>,
          <>
            {kw("WHERE")} project {kw("=")} {str("'FIDS'")};
          </>,
        ]}
      />

      <PanelTitle>Test execution</PanelTitle>
      <div className="border border-border rounded-md p-4.5 mb-4.5 bg-bg-1">
        <div className="flex justify-between items-baseline mb-2.5">
          <span>QA scope</span>
          <span className="text-lg font-bold text-green">TOPCIT L2</span>
        </div>
        <div className="h-2.5 bg-bg-2 rounded-full overflow-hidden border border-border mb-3">
          <div className="h-full bg-gradient-to-r from-accent-dim to-green" style={{ width: "88%" }} />
        </div>
        <div className="flex gap-6 text-xs text-text-1 flex-wrap">
          <span>Workflow <b className="text-text-0">passed</b></span>
          <span>LAN/network <b className="text-text-0">passed</b></span>
          <span>Database <b className="text-text-0">passed</b></span>
          <span>Cert score <b className="text-text-0">150–399</b></span>
        </div>
      </div>

      <ResultPanel label="Test cases" meta={`${testCases.length} rows`}>
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
      </ResultPanel>

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
