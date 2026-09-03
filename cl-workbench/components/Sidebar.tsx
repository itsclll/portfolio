import { ViewId } from "./NavTabs";

export type DatabaseSection = "profile" | "education" | "skills" | "certifications";

type SidebarProps = {
  onGoto: (id: ViewId) => void;
  onDatabaseSelect?: (section: DatabaseSection) => void;
  activeView: ViewId;
  activeDatabaseSection: DatabaseSection | null;
  isOpen: boolean;
  onClose: () => void;
};

const groups: { label: string; items: { name: string; goto: ViewId; section?: DatabaseSection }[] }[] = [
  {
    label: "Profile",
    items: [
      { name: "personal details", goto: "database", section: "profile" },
      { name: "education", goto: "database", section: "education" },
      { name: "skills", goto: "database", section: "skills" },
      { name: "certifications", goto: "database", section: "certifications" },
    ],
  },
  {
    label: "Portfolio",
    items: [
      { name: "Projects", goto: "projects" },
      { name: "Experience", goto: "experience" },
      { name: "Gear", goto: "gear" },
      { name: "QA Lab", goto: "qalab" },
    ],
  },
  {
    label: "System",
    items: [
      { name: "Terminal", goto: "terminal" },
      { name: "Contact", goto: "contact" },
    ],
  },
];

export default function Sidebar({
  onGoto,
  onDatabaseSelect,
  activeView,
  activeDatabaseSection,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          aria-label="Close navigation menu"
        />
      )}
      <aside className={`fixed inset-y-0 left-0 z-40 w-[230px] overflow-y-auto border-r border-border bg-bg-1 py-4 transition-transform md:static md:z-auto md:block md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-3 flex items-center justify-between px-4 md:hidden">
          <span className="text-xs text-text-2">Navigation</span>
          <button type="button" onClick={onClose} className="px-1 text-text-2 md:hover:text-text-0" aria-label="Close navigation menu">
            x
          </button>
        </div>
      {groups.map((group) => (
        <div key={group.label}>
          <div className="px-4 pt-2.5 pb-1.5 text-[10px] leading-none text-text-2 uppercase tracking-wider">
            {group.label}
          </div>
          {group.items.map((item) => {
            const isActive = activeView === item.goto &&
              (item.goto !== "database" || activeDatabaseSection === item.section);

            return (
              <button
                key={item.name}
                onClick={() => {
                  if (item.goto === "database" && onDatabaseSelect && item.section) {
                    onDatabaseSelect(item.section);
                  }

                  onGoto(item.goto);
                  onClose();
                }}
                aria-current={isActive ? "page" : undefined}
                className={`block w-full border-l-2 py-1.5 pl-[28px] pr-4 text-left text-[12.5px] leading-none tracking-normal transition-colors md:hover:bg-bg-2 md:hover:text-text-0 ${
                  isActive
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-transparent text-text-1"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      ))}
      </aside>
    </>
  );
}
