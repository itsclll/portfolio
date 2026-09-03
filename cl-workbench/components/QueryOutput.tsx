import Badge from "@/components/Badge";
import type { QueryRun } from "@/components/QueryEditor";
import { Grid, ResultPanel } from "@/components/ResultPanel";
import {
  experience,
  gearSections,
  normalizePortfolioQuery,
  profile,
  projectDetails,
  projects,
  responsibilities,
  testCases,
} from "@/lib/data";

const matches = (result: QueryRun, query: string) =>
  normalizePortfolioQuery(result.query) === normalizePortfolioQuery(query);

const statusKind = (status: string) =>
  status === "COMPLETE" || status === "PASSED" ? "pass" : "live";

export default function QueryOutput({ result }: { result: QueryRun }) {
  if (matches(result, "SELECT * FROM profile;")) {
    return (
      <ResultPanel label="Profile result" meta="1 row returned">
        <Grid headers={["field", "value"]} rows={[
          ["name", profile.name], ["role", profile.role], ["specialization", profile.specialization],
          ["location", profile.location], ["email", profile.email], ["phone", profile.phone],
          ["status", <Badge key="status" kind="live">{profile.status}</Badge>],
        ]} />
      </ResultPanel>
    );
  }

  if (matches(result, "SELECT * FROM projects;")) {
    return (
      <ResultPanel label="Projects" meta={`${projects.length} rows`}>
        <Grid headers={["id", "project", "status"]} rows={projects.map((project) => [
          project.id,
          <span className="font-medium text-text-0" key={project.id}>{project.name}</span>,
          <Badge key={`${project.id}-status`} kind={statusKind(project.status)}>{project.status}</Badge>,
        ])} />
      </ResultPanel>
    );
  }

  const projectDetail = matches(result, "SELECT * FROM project_details WHERE project_id = '01';")
    ? projectDetails.sluCca
    : matches(result, "SELECT * FROM project_details WHERE project_id = '02';")
      ? projectDetails.adal
      : null;
  if (projectDetail) {
    return (
      <ResultPanel label="Project detail" meta="1 row returned">
        <Grid headers={["project", "type", "role", "technologies"]} rows={[[
          projectDetail.project, projectDetail.type, projectDetail.role, projectDetail.technologies,
        ]]} />
      </ResultPanel>
    );
  }

  const contributions = matches(result, "SELECT contribution FROM project_contributions WHERE project_id = '01' ORDER BY id;")
    ? projectDetails.sluCca.contributions
    : matches(result, "SELECT contribution FROM project_contributions WHERE project_id = '02' ORDER BY id;")
      ? projectDetails.adal.contributions
      : null;
  if (contributions) {
    return (
      <ResultPanel label="Project contributions" meta={`${contributions.length} rows`}>
        <Grid headers={["contribution"]} rows={contributions.map((contribution) => [contribution])} />
      </ResultPanel>
    );
  }

  if (matches(result, "SELECT * FROM test_cases WHERE project = 'FIDS';")) {
    return (
      <ResultPanel label="Test cases" meta={`${testCases.length} rows`}>
        <Grid headers={["id", "case", "status"]} rows={testCases.map((testCase) => [
          testCase.id,
          testCase.name,
          <Badge key={testCase.id} kind={statusKind(testCase.status)}>{testCase.status}</Badge>,
        ])} />
      </ResultPanel>
    );
  }

  const experienceQuery = "SELECT id, role, company, start_date, end_date FROM experience ORDER BY start_date DESC;";
  if (matches(result, experienceQuery) || matches(result, "SELECT id, role, company, DATE_FORMAT(start_date, '%B %Y') AS start_date, DATE_FORMAT(end_date, '%B %Y') AS end_date FROM experience ORDER BY start_date DESC;")) {
    return (
      <ResultPanel label="Experience" meta={`${experience.length} rows`}>
        <Grid headers={["id", "role", "company", "period"]} rows={experience.map((item) => [
          item.id, item.role, item.company, item.period,
        ])} />
      </ResultPanel>
    );
  }

  const responsibilityMatch = result.query.match(/SELECT\s+responsibility\s+FROM\s+responsibilities\s+WHERE\s+experience_id\s*=\s*(\d+)/i);
  if (responsibilityMatch) {
    const experienceId = Number(responsibilityMatch[1]);
    const items = responsibilities.filter((item) => item.experience_id === experienceId);
    if (items.length) {
      return (
        <ResultPanel label="Role responsibilities" meta={`${items.length} rows`}>
          <Grid headers={["responsibility"]} rows={items.map((item) => [item.responsibility])} />
        </ResultPanel>
      );
    }
  }

  const gear = matches(result, "SELECT gear, purpose, product FROM gear WHERE type = 'desk_setup';")
    ? gearSections[0].items
    : matches(result, "SELECT gear, purpose, product FROM gear WHERE type = 'everyday_carry';")
      ? gearSections[1].items
      : null;
  if (gear) {
    return (
      <ResultPanel label="Gear" meta={`${gear.length} rows`}>
        <Grid headers={["gear", "purpose", "product"]} fixedColumns={false} rows={gear.map((item) => [
          item.name,
          item.detail,
          <a className="text-accent hover:underline" href={item.url} key={item.url} rel="noreferrer" target="_blank">View product</a>,
        ])} />
      </ResultPanel>
    );
  }

  return (
    <ResultPanel label="Query result" meta="Query executed">
      <div className="p-3.5">
        <div className="mb-3 overflow-x-auto rounded border border-border bg-bg-2 px-3 py-2 font-['JetBrains_Mono',monospace] text-[11px] leading-5 text-accent">
          <span className="mr-2 select-none text-text-2">SQL</span>{result.query.trim()}
        </div>
        <div className="overflow-hidden rounded border border-border bg-[#070a0e]">
          <div className="border-b border-border bg-bg-1 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-text-2">Data output</div>
          <pre className="max-h-[26rem] overflow-auto whitespace-pre-wrap px-3 py-3 font-['JetBrains_Mono',monospace] text-[12px] leading-6 text-text-1">{result.output}</pre>
        </div>
      </div>
    </ResultPanel>
  );
}
