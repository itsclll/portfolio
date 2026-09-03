type BadgeKind = "pass" | "fail" | "fixed" | "live";

const styles: Record<BadgeKind, string> = {
  pass: "bg-green/10 text-green border-green/30",
  fail: "bg-red/10 text-red border-red/30",
  fixed: "bg-amber/10 text-amber border-amber/30",
  live: "bg-accent/10 text-accent border-accent/30",
};

export default function Badge({
  kind,
  children,
}: {
  kind: BadgeKind;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-[10.5px] leading-none ${styles[kind]}`}
    >
      {children}
    </span>
  );
}
