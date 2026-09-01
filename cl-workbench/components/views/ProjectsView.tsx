import QueryEditor, { kw, fn, str } from "@/components/QueryEditor";
import { ResultPanel, Grid, PanelTitle } from "@/components/ResultPanel";
import Badge from "@/components/Badge";
import { projects, projectDetails } from "@/lib/data";

const statusKind = (s: string) =>
  s === "DEPLOYED" ? "live" : s === "COMPLETE" ? "pass" : "fixed";

export default function ProjectsView() {
  return (
    <div>
      <PanelTitle>SQL editor</PanelTitle>
      <QueryEditor
        lines={[
          <>
            {kw("SELECT")} * {kw("FROM")} {fn("projects")};
          </>,
        ]}
      />

      <ResultPanel label="Query result" meta={`${projects.length} rows in 0.002s`}>
        <Grid
          headers={["id", "project", "role", "status"]}
          rows={projects.map((p) => [
            p.id,
            <span className="text-text-0 font-medium" key={p.id}>{p.name}</span>,
            p.role,
            <Badge kind={statusKind(p.status)} key={p.status}>{p.status}</Badge>,
          ])}
        />
      </ResultPanel>

      <PanelTitle>Project detail — SLU CCA Ticketing System</PanelTitle>
      <QueryEditor
        lines={[
          <>
            {kw("SELECT")} * {kw("FROM")} {fn("projects")}
          </>,
          <>
            {kw("WHERE")} id {kw("=")} {str("'01'")};
          </>,
        ]}
      />
      <ResultPanel label="Query result" meta="1 row returned">
        <Grid
          headers={["field", "value"]}
          rows={[
            ["project", projectDetails.sluCca.project],
            ["type", projectDetails.sluCca.type],
            ["role", projectDetails.sluCca.role],
            ["technologies", projectDetails.sluCca.technologies],
          ]}
        />
      </ResultPanel>

      <PanelTitle>Project contributions</PanelTitle>
      <ResultPanel label="Validated contributions" meta="4 items">
        <Grid
          headers={["contribution"]}
          rows={projectDetails.sluCca.contributions.map((contribution) => [
            <span className="block w-full leading-relaxed md:w-3/4" key={contribution}>
              {contribution}
            </span>,
          ])}
        />
      </ResultPanel>

      <PanelTitle>Project detail — Adal</PanelTitle>
      <QueryEditor
        lines={[
          <>
            {kw("SELECT")} * {kw("FROM")} {fn("projects")}
          </>,
          <>
            {kw("WHERE")} id {kw("=")} {str("'02'")};
          </>,
        ]}
      />
      <ResultPanel label="Query result" meta="1 row returned">
        <Grid
          headers={["field", "value"]}
          rows={[
            ["project", projectDetails.adal.project],
            ["type", projectDetails.adal.type],
            ["role", projectDetails.adal.role],
            ["technologies", projectDetails.adal.technologies],
          ]}
        />
      </ResultPanel>

      <PanelTitle>Project contributions — Adal</PanelTitle>
      <ResultPanel label="Validated contributions" meta="4 items">
        <Grid
          headers={["contribution"]}
          rows={projectDetails.adal.contributions.map((contribution) => [
            <span className="block w-full leading-relaxed md:w-3/4" key={contribution}>
              {contribution}
            </span>,
          ])}
        />
      </ResultPanel>
    </div>
  );
}
