# CL_WORKBENCH — Christian A. Lucina's Portfolio

A portfolio site styled like a MySQL Workbench / QA testing tool, built with
Next.js, TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Project structure

```
app/
  layout.tsx       — root layout, loads global styles
  page.tsx          — main page: boot screen + tab-switching app shell
  globals.css        — Tailwind + font imports

components/
  BootScreen.tsx      — landing "connecting to database..." animation
  TopBar.tsx           — logo, connection status, live clock
  NavTabs.tsx           — Database / QA Lab / Projects / Experience / Terminal tabs
  Sidebar.tsx            — left schema/table navigation
  Badge.tsx               — status pill (pass / fail / fixed / live)
  QueryEditor.tsx          — SQL editor mock with syntax highlight helpers
  ResultPanel.tsx           — query result panel + data grid table
  views/
    DatabaseView.tsx         — profile, education, certifications, skills
    QALabView.tsx              — test cases, pass rate, bug ticket
    ProjectsView.tsx            — projects table + drill-down detail
    ExperienceView.tsx           — work history
    TerminalView.tsx              — working fake SQL terminal

lib/
  data.ts   — ALL your content lives here (profile, skills, projects, etc.)

public/
  photo.jpg   — your profile photo (replace this file to update it)
```

## Editing your content

You should almost never need to touch component code. Everything — your
name, contact info, skills, projects, experience, and even the terminal's
command responses — lives in `lib/data.ts`. Open that file and edit the
values directly.

To change your photo, replace `public/photo.jpg` with your own image
(keep the same filename, or update the `photo` path in `lib/data.ts`).

## Deploying

The fastest path is [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

Or push this repo to GitHub and import it directly on vercel.com — it
auto-detects Next.js and needs zero configuration.

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- No database, no backend — the "SQL terminal" is a client-side lookup
  table in `lib/data.ts`, so there's nothing to host or configure.
