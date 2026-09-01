import Image from "next/image";
import QueryEditor, { kw, fn, str } from "@/components/QueryEditor";
import { ResultPanel, Grid, PanelTitle } from "@/components/ResultPanel";
import Badge from "@/components/Badge";
import { useEffect } from "react";
import type { DatabaseSection } from "@/components/Sidebar";
import { profile, education, certifications, skills } from "@/lib/data";

const skillImages: Record<string, string> = {
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  Supabase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  "Prisma ORM": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  Vercel: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  Netlify: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
  GCP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  Azure: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "GitHub Actions": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
  Ubuntu: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-original.svg",
  Kubuntu: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubuntu/kubuntu-original.svg",
  VirtualBox: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/virtualbox/virtualbox-original.svg",
};

function SkillToken({ name }: { name: string }) {
  const image = skillImages[name];

  if (!image) return <span>{name}</span>;

  return (
    <span className="group/skill relative inline-block cursor-help">
      {name}
      <span className="pointer-events-none absolute bottom-full left-0 z-40 mb-2 hidden h-24 w-24 items-center justify-center rounded-md border border-border bg-white p-3 shadow-2xl md:group-hover/skill:flex group-focus-within/skill:flex">
        <img src={image} alt={`${name} logo`} className="max-h-full max-w-full object-contain" />
      </span>
    </span>
  );
}

function SkillList({ value }: { value: string }) {
  return (
    <span>
      {value.split(", ").map((name, index) => (
        <span key={name}>
          {index > 0 && ", "}
          <SkillToken name={name} />
        </span>
      ))}
    </span>
  );
}

export default function DatabaseView({ section }: { section: DatabaseSection | null }) {
  useEffect(() => {
    if (section) {
      document.getElementById(`database-${section}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [section]);

  return (
    <div>
      <PanelTitle>SQL editor</PanelTitle>
      <QueryEditor
        lines={[
          <>{kw("SELECT")} *</>,
          <>
            {kw("FROM")} {fn("profile")};
          </>,
        ]}
      />

      <PanelTitle>Query result</PanelTitle>
      <div id="database-profile">
        <ResultPanel label="Data output" meta="1 row in 0.003s">
        <div className="flex items-center gap-4 px-3.5 pt-3.5 pb-3 leading-none">
          <div className="h-40 w-40 overflow-hidden rounded-lg border-2 border-accent-dim shrink-0 relative bg-bg-2">
            <Image src={profile.photo} alt={profile.name} fill className="object-cover object-center" sizes="200px" />
          </div>
          <div className="leading-none">
            <div className="text-[15px] font-semibold text-text-0">{profile.name}</div>
            <div className="mt-1 text-xs text-accent">{profile.role}</div>
          </div>
        </div>
        <Grid
          headers={["field", "value"]}
          rows={[
            ["name", <span className="text-text-0 font-medium" key="n">{profile.name}</span>],
            ["role", profile.role],
            ["specialization", profile.specialization],
            ["location", profile.location],
            ["email", profile.email],
            ["phone", profile.phone],
            ["status", <Badge kind="live" key="s">{profile.status}</Badge>],
          ]}
        />
        </ResultPanel>
      </div>

      <div id="database-education">
        <PanelTitle>Education</PanelTitle>
        <ResultPanel label="Data output">
        <Grid
          headers={["field", "value"]}
          rows={[
            ["school", <span className="text-text-0 font-medium" key="sc">{education.school}</span>],
            ["degree", education.degree],
            ["period", education.period],
            ["honors", education.honors],
            ["gwa", education.gwa],
            ["status", <Badge kind="live" key="st">{education.status}</Badge>],
          ]}
        />
        </ResultPanel>
      </div>

      <div id="database-skills">
        <PanelTitle>Skills</PanelTitle>
        <ResultPanel label="Data output">
        <Grid
          headers={["skill", "category"]}
          fixedColumns={false}
          rows={skills.map((s) => [
            <span className="text-text-0 font-medium" key={s.category}><SkillList value={s.value} /></span>,
            s.category,
          ])}
        />
        </ResultPanel>
      </div>

      <div id="database-certifications">
        <PanelTitle>Certifications &amp; Awards</PanelTitle>
        <ResultPanel label="Credentials output">
        <Grid
          headers={["credential", "issuer", "recognition"]}
          rows={certifications.map((c) => [
            <span className="text-text-0 font-medium" key={c.name}>{c.name}</span>,
            c.issuer,
            <Badge kind={c.result.toLowerCase().includes("competent") ? "pass" : "live"} key={c.result}>
              {c.result}
            </Badge>,
          ])}
        />
        </ResultPanel>
      </div>
    </div>
  );
}
