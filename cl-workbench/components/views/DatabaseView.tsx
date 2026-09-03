import Image from "next/image";
import { useEffect, useState } from "react";
import QueryEditor, { kw, fn, str } from "@/components/QueryEditor";
import { ResultPanel, Grid, PanelTitle } from "@/components/ResultPanel";
import Badge from "@/components/Badge";
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
 
function ProfilePhotoSlideshow({ photos, alt }: { photos: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);
 
  useEffect(() => {
    if (photos.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % photos.length);
    }, 3500);
    return () => clearInterval(id);
  }, [photos.length]);
 
  const go = (i: number) => setCurrent((i + photos.length) % photos.length);
 
  return (
    <div className="relative h-[340px] w-full overflow-hidden rounded-lg border border-accent-dim bg-bg-2">
      {photos.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${alt} ${i + 1}`}
          fill
          sizes="300px"
          className={`object-cover object-center transition-opacity duration-500 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
 
      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(current - 1)}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 z-20 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg-0/60 text-xs text-text-2 hover:border-accent-dim hover:text-text-0"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => go(current + 1)}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 z-20 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg-0/60 text-xs text-text-2 hover:border-accent-dim hover:text-text-0"
          >
            ›
          </button>
          <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center gap-1.5 bg-gradient-to-t from-bg-0/70 to-transparent py-2.5">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to photo ${i + 1}`}
                onClick={() => go(i)}
                className={`h-1.5 w-1.5 rounded-full transition-transform ${
                  i === current ? "scale-125 bg-accent" : "bg-text-2/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
 
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}
 
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-7.9h2.65l.4-3.08h-3.05V8.05c0-.89.25-1.5 1.52-1.5h1.63V3.8C15.94 3.72 15 3.63 13.9 3.63c-2.3 0-3.87 1.4-3.87 3.98v2.42H7.36v3.08h2.67V21h3.47z" />
    </svg>
  );
}
 
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.31 6.84 9.66.5.1.68-.22.68-.5 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.49-1.11-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.36-2.22-.26-4.56-1.13-4.56-5.04 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.04a9.3 9.3 0 0 1 5 0c1.9-1.32 2.75-1.04 2.75-1.04.55 1.42.2 2.46.1 2.72.64.71 1.03 1.62 1.03 2.73 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .28.18.61.69.5A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}
 

 
function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2.5 rounded-md border border-border bg-bg-2 px-3 py-2.5 text-xs text-text-2 transition-colors hover:border-accent-dim hover:text-text-0"
    >
      <span className="h-3.5 w-3.5 shrink-0">{icon}</span>
      {label}
    </a>
  );
}
 
export default function DatabaseView({ section }: { section: DatabaseSection | null }) {
  useEffect(() => {
    if (section) {
      document.getElementById(`database-${section}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [section]);
 
  const photos = profile.photos && profile.photos.length ? profile.photos : [profile.photo];
  const [hasRun, setHasRun] = useState(false);
 
  return (
    <div>
      <PanelTitle>SQL editor</PanelTitle>
      <QueryEditor
        onRun={() => setHasRun(true)}
        formattedQuery="SELECT * FROM profile;"
        lines={[
          <>{kw("SELECT")} *</>,
          <>
            {kw("FROM")} {fn("profile")};
          </>,
        ]}
      />

      {hasRun && <PanelTitle>Query result</PanelTitle>}

      {hasRun && <div id="database-profile">
        <ResultPanel label="Data output" meta="1 row in 0.003s">
          <div className="px-3.5 py-3.5">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[340px_minmax(0,1fr)]">

              {/* Photo + Social Links */}
              <div className="min-w-0">

                {/* Photo */}
                <div className="w-full max-w-[300px]">
                  <ProfilePhotoSlideshow
                    photos={photos}
                    alt={profile.name}
                  />
                </div>

                {/* Social Links */}
                <div className="mt-4 flex flex-nowrap gap-2">
                  <SocialLink
                    href="https://www.linkedin.com/in/christian-lucina-ab6666394/"
                    label="LinkedIn"
                    icon={<LinkedInIcon />}
                  />

                  <SocialLink
                    href="https://www.facebook.com/christian.lucina.7/"
                    label="Facebook"
                    icon={<FacebookIcon />}
                  />

                  <SocialLink
                    href="https://github.com/itsclll"
                    label="GitHub"
                    icon={<GithubIcon />}
                  />
                </div>

              </div>

              {/* Personal Details */}
              <div className="min-w-0 lg:pt-2">

                {/* Name */}
                <div className="text-[24px] font-semibold leading-tight text-text-0 sm:text-[26px] lg:text-[28px]">
                  {profile.name}
                </div>

                {/* Role */}
                <div className="mt-2 text-sm text-accent sm:text-[15px] lg:text-base">
                  {profile.role}
                </div>

                {/* Personal Details Table */}
                <div className="mt-6 w-full">
                  <Grid
                    headers={["field", "value"]}
                    rows={[
                      ["specialization", profile.specialization],
                      ["location", profile.location],
                      ["email", profile.email],
                      ["phone", profile.phone],
                      [
                        "status",
                        <Badge kind="live" key="s">
                          {profile.status}
                        </Badge>,
                      ],
                    ]}
                  />
                </div>

              </div>

            </div>
          </div>
        </ResultPanel>
      </div>}
 
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