"use client";

import { useState } from "react";
import BootScreen from "@/components/BootScreen";
import TopBar from "@/components/TopBar";
import NavTabs, { ViewId } from "@/components/NavTabs";
import Sidebar from "@/components/Sidebar";
import DatabaseView from "@/components/views/DatabaseView";
import QALabView from "@/components/views/QALabView";
import ProjectsView from "@/components/views/ProjectsView";
import ExperienceView from "@/components/views/ExperienceView";
import TerminalView from "@/components/views/TerminalView";
import ContactView from "@/components/views/ContactView";
import GearView from "@/components/views/GearView";
import { DatabaseSection } from "@/components/Sidebar";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [view, setView] = useState<ViewId>("database");
  const [databaseSection, setDatabaseSection] = useState<DatabaseSection | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!entered) {
    return <BootScreen onEnter={() => setEntered(true)} />;
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="shrink-0">
        <TopBar />
        <NavTabs active={view} onChange={setView} />
      </div>
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar
          onGoto={setView}
          onDatabaseSelect={setDatabaseSection}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-3 py-4 sm:px-5 sm:py-5 lg:px-[26px] lg:py-[22px]">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="mb-4 border border-border bg-bg-1 px-3 py-2 text-xs text-text-1 md:hover:border-accent md:hover:text-text-0 md:hidden"
            aria-label="Open navigation menu"
          >
            Menu
          </button>
          {view === "database" && <DatabaseView section={databaseSection} />}
          {view === "qalab" && <QALabView />}
          {view === "projects" && <ProjectsView />}
          {view === "experience" && <ExperienceView />}
          {view === "terminal" && <TerminalView />}
          {view === "contact" && <ContactView />}
          {view === "gear" && <GearView />}
        </main>
      </div>
    </div>
  );
}
