import { gearSections } from "@/lib/data";
import QueryEditor, { fn, kw } from "@/components/QueryEditor";
import { ResultPanel, Grid, PanelTitle } from "@/components/ResultPanel";

export default function GearView() {
  return (
    <div>
      <div className="mb-7">
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-text-1">
          A work-from-home-ready setup built for development, testing, communication, and everyday productivity.
        </p>
      </div>

      {gearSections.map((section) => {
        const tableName = section.title === "Desk Setup" ? "desk_setup" : "everyday_carry";

        return (
          <section key={section.title}>
            <PanelTitle>SQL editor</PanelTitle>
            <QueryEditor
              lines={[
                <>
                  {kw("SELECT")} * {kw("FROM")} {fn(tableName)};
                </>,
              ]}
            />

            <PanelTitle>Query result</PanelTitle>
            <ResultPanel label={`${section.title} output`} meta={`${section.items.length} items`}>
              <Grid
                headers={["gear", "purpose", "product"]}
                fixedColumns={false}
                rows={section.items.map((item) => [
                  <span className="group relative flex items-center gap-2" key={item.name}>
                    <img
                      src={item.image}
                      alt={`${item.name} thumbnail`}
                      className="h-8 w-8 shrink-0 rounded border border-border bg-white object-contain transition-transform duration-200 md:group-hover:scale-110"
                    />
                    <span className="pointer-events-none absolute bottom-full left-0 z-30 mb-2 hidden h-52 w-64 items-center justify-center rounded-md border border-border bg-white p-2 shadow-2xl md:group-hover:flex group-focus-within:flex">
                      <img
                        src={item.image}
                        alt={`${item.name} preview`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </span>
                    <span className="font-medium text-text-0">{item.name}</span>
                  </span>,
                  item.detail,
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent md:hover:underline"
                  >
                    View product
                  </a>,
                ])}
              />
            </ResultPanel>
          </section>
        );
      })}
    </div>
  );
}