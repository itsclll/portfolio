import { useState } from "react";
import QueryEditor, { kw, fn, str } from "@/components/QueryEditor";
import { ResultPanel, Grid, PanelTitle } from "@/components/ResultPanel";
import Badge from "@/components/Badge";
import { projects, projectDetails } from "@/lib/data";

const statusKind = (s: string) =>
  s === "DEPLOYED" ? "live" : s === "COMPLETE" ? "pass" : "fixed";

export default function ProjectsView() {
  const [ran, setRan] = useState<boolean[]>([]);
  const run = (index: number) => setRan((previous) => [...previous, index]);

  return (
    <div>
      <PanelTitle>SQL editor</PanelTitle>
      <QueryEditor
        onRun={() => run(0)}
        formattedQuery="SELECT * FROM projects;"
        lines={[
          <>
            {kw("SELECT")} * {kw("FROM")} {fn("projects")};
          </>,
        ]}
      />

      {ran.includes(0) && <ResultPanel label="Query result" meta={`${projects.length} rows in 0.002s`}>
        <Grid
          headers={["id", "project", "status"]}
          rows={projects.map((p) => [
            p.id,
            <span className="text-text-0 font-medium" key={p.id}>{p.name}</span>,
            <Badge kind={statusKind(p.status)} key={p.status}>{p.status}</Badge>,
          ])}
        />
      </ResultPanel>}

      <PanelTitle>Project detail — SLU CCA Ticketing System</PanelTitle>
      <QueryEditor
        onRun={() => run(1)}
        formattedQuery="SELECT * FROM project_details WHERE project_id = '01';"
        lines={[
          <>
            {kw("SELECT")} * {kw("FROM")} {fn("project_details")}
          </>,
          <>
            {kw("WHERE")} project_id {kw("=")} {str("'01'")};
          </>,
        ]}
      />
      {ran.includes(1) && <ResultPanel label="Query result" meta="1 row returned">
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

      <PanelTitle>SQL editor</PanelTitle>
      <QueryEditor
        onRun={() => run(2)}
        formattedQuery="SELECT contribution FROM project_contributions WHERE project_id = '01' ORDER BY id;"
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
      {ran.includes(2) && <ResultPanel label="Query result" meta="4 items">
        <Grid
          headers={["contribution"]}
          rows={projectDetails.sluCca.contributions.map((contribution) => [
            <span className="block w-full leading-relaxed md:w-3/4" key={contribution}>
              {contribution}
            </span>,
          ])}
        />
      </ResultPanel>}

      <PanelTitle>Project detail — Adal</PanelTitle>
      <QueryEditor
        onRun={() => run(3)}
        formattedQuery="SELECT * FROM project_details WHERE project_id = '02';"
        lines={[
          <>
            {kw("SELECT")} * {kw("FROM")} {fn("project_details")}
          </>,
          <>
            {kw("WHERE")} project_id {kw("=")} {str("'02'")};
          </>,
        ]}
      />
      {ran.includes(3) && <ResultPanel label="Query result" meta="1 row returned">
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

      <PanelTitle>SQL editor</PanelTitle>
      <QueryEditor
        onRun={() => run(4)}
        formattedQuery="SELECT contribution FROM project_contributions WHERE project_id = '02' ORDER BY id;"
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
      {ran.includes(4) && <ResultPanel label="Query result" meta="4 items">
        <Grid
          headers={["contribution"]}
          rows={projectDetails.adal.contributions.map((contribution) => [
            <span className="block w-full leading-relaxed md:w-3/4" key={contribution}>
              {contribution}
            </span>,
          ])}
        />
      </ResultPanel>}
    </div>
  );
}
