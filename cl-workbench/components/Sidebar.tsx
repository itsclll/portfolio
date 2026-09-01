import { ViewId } from "./NavTabs";

export type DatabaseSection = "profile" | "education" | "skills" | "certifications";

type SidebarProps = {
  onGoto: (id: ViewId) => void;
  onDatabaseSelect?: (section: DatabaseSection) => void;
  isOpen: boolean;
  onClose: () => void;
};

const groups: { label: string; items: { name: string; goto: ViewId }[] }[] = [
  {
    label: "Database",
    items: [
      { name: "profile", goto: "database" },
      { name: "education", goto: "database" },
      { name: "skills", goto: "database" },
      { name: "certifications", goto: "database" },
    ],
  },
  {
    label: "QA test lab",
    items: [
      { name: "test_cases", goto: "qalab" },
      { name: "bug_reports", goto: "qalab" },
      { name: "test_results", goto: "qalab" },
    ],
  },
  {
    label: "Personal",
    items: [{ name: "gear", goto: "gear" }],
  },
  {
    label: "System logs",
    items: [{ name: "query_history", goto: "terminal" }],
  },
  {
    label: "Contact",
    items: [{ name: "contact_requests", goto: "contact" }],
  },
];

export default function Sidebar({ onGoto, onDatabaseSelect, isOpen, onClose }: SidebarProps) {
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
          {group.items.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                onGoto(item.goto);
                onClose();
                if (item.goto === "database" && onDatabaseSelect) {
                  onDatabaseSelect(item.name as DatabaseSection);
                }
              }}
              className="block w-full text-left pl-[28px] pr-4 py-1.5 text-[12.5px] leading-none tracking-normal text-text-1 border-l-2 border-transparent md:hover:bg-bg-2 md:hover:text-text-0"
            >
              {item.name}
            </button>
          ))}
        </div>
      ))}
      </aside>
    </>
  );
}
