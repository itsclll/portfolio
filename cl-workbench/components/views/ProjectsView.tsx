import { useState } from "react";
import QueryEditor, { kw, fn, str } from "@/components/QueryEditor";
import QueryOutput from "@/components/QueryOutput";
import type { QueryRun } from "@/components/QueryEditor";
import { ResultPanel, Grid, PanelTitle } from "@/components/ResultPanel";
import Badge from "@/components/Badge";
import { normalizePortfolioQuery, projects, projectDetails } from "@/lib/data";

const statusKind = (s: string) =>
  s === "DEPLOYED" ? "live" : s === "COMPLETE" ? "pass" : "fixed";

export default function ProjectsView() {
  const [results, setResults] = useState<Record<number, QueryRun | undefined>>({});
  const run = (index: number, result: QueryRun | null) =>
    setResults((previous) => {
      if (result) return { ...previous, [index]: result };
      const { [index]: _, ...remaining } = previous;
      return remaining;
    });
  const hasRun = (index: number, query: string) =>
    Boolean(results[index] && normalizePortfolioQuery(results[index]!.query) === normalizePortfolioQuery(query));

  return (
    <div>
      <PanelTitle>SQL editor</PanelTitle>
      <QueryEditor
        onRun={(result) => run(0, result)}
        formattedQuery="SELECT * FROM projects;"
        explanation="Lists the portfolio projects and their completion status."
        lines={[
          <>
            {kw("SELECT")} * {kw("FROM")} {fn("projects")};
          </>,
        ]}
      />

      {hasRun(0, "SELECT * FROM projects;") && <ResultPanel label="Query result" meta={`${projects.length} rows in 0.002s`}>
        <Grid
          headers={["id", "project", "status"]}
          rows={projects.map((p) => [
            p.id,
            <span className="text-text-0 font-medium" key={p.id}>{p.name}</span>,
            <Badge kind={statusKind(p.status)} key={p.status}>{p.status}</Badge>,
          ])}
        />
      </ResultPanel>}
      {results[0] && !hasRun(0, "SELECT * FROM projects;") && <QueryOutput result={results[0]} />}

      <PanelTitle>Project detail — SLU CCA Ticketing System</PanelTitle>
      <QueryEditor
        onRun={(result) => run(1, result)}
        formattedQuery="SELECT * FROM project_details WHERE project_id = '01';"
        explanation="Shows the overview, role, and technologies for the SLU CCA Ticketing System."
        lines={[
          <>
            {kw("SELECT")} * {kw("FROM")} {fn("project_details")}
          </>,
          <>
            {kw("WHERE")} project_id {kw("=")} {str("'01'")};
          </>,
        ]}
      />
      {hasRun(1, "SELECT * FROM project_details WHERE project_id = '01';") && <ResultPanel label="Query result" meta="1 row returned">
        <Grid
          headers={["project", "type", "role", "technologies"]}
          rows={[
            [
              projectDetails.sluCca.project,
              projectDetails.sluCca.type,
              projectDetails.sluCca.role,
              projectDetails.sluCca.technologies,
            ],
          ]}
        />
      </ResultPanel>}
      {results[1] && !hasRun(1, "SELECT * FROM project_details WHERE project_id = '01';") && <QueryOutput result={results[1]} />}

      <PanelTitle>SQL editor</PanelTitle>
      <QueryEditor
        onRun={(result) => run(2, result)}
        formattedQuery="SELECT contribution FROM project_contributions WHERE project_id = '01' ORDER BY id;"
        explanation="Lists the key contributions made to the SLU CCA Ticketing System."
        lines={[
          <>
            {kw("SELECT")} contribution
          </>,
          <>
            {kw("FROM")} {fn("project_contributions")}
          </>,
          <>
            {kw("WHERE")} project_id {kw("=")} {str("'01'")}
          </>,
          <>
            {kw("ORDER BY")} id;
          </>,
        ]}
      />
      {hasRun(2, "SELECT contribution FROM project_contributions WHERE project_id = '01' ORDER BY id;") && <ResultPanel label="Query result" meta="4 items">
        <Grid
          headers={["contribution"]}
          rows={projectDetails.sluCca.contributions.map((contribution) => [
            <span className="block w-full leading-relaxed md:w-3/4" key={contribution}>
              {contribution}
            </span>,
          ])}
        />
      </ResultPanel>}
      {results[2] && !hasRun(2, "SELECT contribution FROM project_contributions WHERE project_id = '01' ORDER BY id;") && <QueryOutput result={results[2]} />}

      <PanelTitle>Project detail — Adal</PanelTitle>
      <QueryEditor
        onRun={(result) => run(3, result)}
        formattedQuery="SELECT * FROM project_details WHERE project_id = '02';"
        explanation="Shows the overview, role, and technologies for the Adal project."
        lines={[
          <>
            {kw("SELECT")} * {kw("FROM")} {fn("project_details")}
          </>,
          <>
            {kw("WHERE")} project_id {kw("=")} {str("'02'")};
          </>,
        ]}
      />
      {hasRun(3, "SELECT * FROM project_details WHERE project_id = '02';") && <ResultPanel label="Query result" meta="1 row returned">
        <Grid
          headers={["project", "type", "role", "technologies"]}
          rows={[
            [
              projectDetails.adal.project,
              projectDetails.adal.type,
              projectDetails.adal.role,
              projectDetails.adal.technologies,
            ],
          ]}
        />
      </ResultPanel>}
      {results[3] && !hasRun(3, "SELECT * FROM project_details WHERE project_id = '02';") && <QueryOutput result={results[3]} />}

      <PanelTitle>SQL editor</PanelTitle>
      <QueryEditor
        onRun={(result) => run(4, result)}
        formattedQuery="SELECT contribution FROM project_contributions WHERE project_id = '02' ORDER BY id;"
        explanation="Lists the key contributions made to the Adal project."
        lines={[
          <>
            {kw("SELECT")} contribution
          </>,
          <>
            {kw("FROM")} {fn("project_contributions")}
          </>,
          <>
            {kw("WHERE")} project_id {kw("=")} {str("'02'")}
          </>,
          <>
            {kw("ORDER BY")} id;
          </>,
        ]}
      />
      {hasRun(4, "SELECT contribution FROM project_contributions WHERE project_id = '02' ORDER BY id;") && <ResultPanel label="Query result" meta="4 items">
        <Grid
          headers={["contribution"]}
          rows={projectDetails.adal.contributions.map((contribution) => [
            <span className="block w-full leading-relaxed md:w-3/4" key={contribution}>
              {contribution}
            </span>,
          ])}
        />
      </ResultPanel>}
      {results[4] && !hasRun(4, "SELECT contribution FROM project_contributions WHERE project_id = '02' ORDER BY id;") && <QueryOutput result={results[4]} />}
    </div>
  );
}
