export type ViewId = "database" | "qalab" | "projects" | "experience" | "terminal" | "contact" | "gear";

const tabs: { id: ViewId; label: string }[] = [
  { id: "database", label: "Profile" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "gear", label: "Gear" },
  { id: "qalab", label: "QA Lab" },
  { id: "terminal", label: "Terminal" },
  { id: "contact", label: "Contact" },
];

export default function NavTabs({
  active,
  onChange,
}: {
  active: ViewId;
  onChange: (id: ViewId) => void;
}) {
  return (
    <div className="hidden gap-1 overflow-x-auto bg-bg-1 px-2 sm:flex sm:px-5 lg:px-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`whitespace-nowrap border-b-2 px-3 py-3 text-xs leading-none tracking-normal sm:px-4 sm:py-[14px] sm:text-[12.5px] ${
            active === tab.id
              ? "text-accent border-accent"
              : "text-text-2 border-transparent md:hover:text-text-1"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
