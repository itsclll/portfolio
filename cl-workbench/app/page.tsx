"use client";

import { useRef, useState } from "react";
import BootScreen from "@/components/BootScreen";
import TopBar from "@/components/TopBar";
import { ViewId } from "@/components/NavTabs";
import Sidebar, { DatabaseSection } from "@/components/Sidebar";
import DatabaseView from "@/components/views/DatabaseView";
import QALabView from "@/components/views/QALabView";
import ProjectsView from "@/components/views/ProjectsView";
import ExperienceView from "@/components/views/ExperienceView";
import TerminalView from "@/components/views/TerminalView";
import ContactView from "@/components/views/ContactView";
import GearView from "@/components/views/GearView";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [view, setView] = useState<ViewId>("projects");
  const [databaseSection, setDatabaseSection] = useState<DatabaseSection | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  const handleViewChange = (nextView: ViewId) => {
    if (nextView === view) {
      return;
    }

    const isSwitchingToDatabase = nextView === "database";
    const isLeavingDatabase = view === "database";

    setView(nextView);

    if (!isSwitchingToDatabase && !isLeavingDatabase) {
      requestAnimationFrame(() => {
        if (mainRef.current) {
          mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    }
  };

  if (!entered) {
    return (
      <BootScreen
        onEnter={() => {
          setEntered(true);
          setView("database");
          setDatabaseSection("profile");
        }}
      />
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="shrink-0">
        <TopBar onToggleSidebar={() => setSidebarOpen((open) => !open)} />
      </div>
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar
          onGoto={handleViewChange}
          onDatabaseSelect={setDatabaseSection}
          activeView={view}
          activeDatabaseSection={databaseSection}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main
          ref={mainRef}
          className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-3 py-4 sm:px-5 sm:py-5 lg:px-[26px] lg:py-[22px]"
        >
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
