import { gearSections } from "@/lib/data";
import QueryEditor, { fn, kw, str } from "@/components/QueryEditor";
import { ResultPanel, Grid, PanelTitle } from "@/components/ResultPanel";

export default function GearView() {
  const deskSetup = gearSections[0].items;
  const everydayCarry = gearSections[1].items;

  return (
    <div>
      <div className="mb-7">
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-text-1">
          A work-from-home-ready setup built for development, testing, communication, and everyday productivity.
        </p>
      </div>

      <PanelTitle>SQL editor</PanelTitle>
      <QueryEditor
        lines={[
          <>
            {kw("SELECT")} gear, purpose, product {kw("FROM")} {fn("gear")}
          </>,
          <>
            {kw("WHERE")} type {kw("=")} {str("'desk_setup'")} ;
          </>,
        ]}
      />

      <ResultPanel label="Query result" meta={`${deskSetup.length} rows`}>
        <Grid
          headers={["gear", "purpose", "product link"]}
          fixedColumns={false}
          rows={deskSetup.map((item) => [
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
            <a href={item.url} target="_blank" rel="noreferrer" className="text-accent md:hover:underline">
               product link
            </a>,
          ])}
        />
      </ResultPanel>

      <PanelTitle>SQL editor</PanelTitle>
      <QueryEditor
        lines={[
          <>
            {kw("SELECT")} gear, purpose, product {kw("FROM")} {fn("gear")}
          </>,
          <>
            {kw("WHERE")} type {kw("=")} {str("'everyday_carry'")} ;
          </>,
        ]}
      />

      <ResultPanel label="Query result" meta={`${everydayCarry.length} rows`}>
        <Grid
          headers={["gear", "purpose", "product link"]}
          fixedColumns={false}
          rows={everydayCarry.map((item) => [
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
            <a href={item.url} target="_blank" rel="noreferrer" className="text-accent md:hover:underline">
              product link
            </a>,
          ])}
        />
      </ResultPanel>
    </div>
  );
}