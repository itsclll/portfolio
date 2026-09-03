"use client";

import { useState } from "react";
import { gearSections } from "@/lib/data";
import QueryEditor, { fn, kw, str } from "@/components/QueryEditor";
import QueryOutput from "@/components/QueryOutput";
import type { QueryRun } from "@/components/QueryEditor";
import { ResultPanel, Grid, PanelTitle } from "@/components/ResultPanel";
import { normalizePortfolioQuery } from "@/lib/data";

type ImagePreviewProps = {
  image: string;
  name: string;
};

function GearImagePreview({ image, name }: ImagePreviewProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });

    setShowPreview(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
  };

  return (
    <>
      <span
        className="inline-flex cursor-help items-center gap-2"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Thumbnail */}
        <img
          src={image}
          alt={`${name} thumbnail`}
          className="h-8 w-8 shrink-0 rounded border border-border bg-white object-contain transition-transform duration-200 md:hover:scale-110"
        />

        {/* Name */}
        <span className="font-medium text-text-0">
          {name}
        </span>
      </span>

      {/* Floating Preview */}
      {showPreview && (
        <div
          className="pointer-events-none fixed z-[9999] hidden -translate-y-1/2 rounded-md border border-border bg-white p-2 shadow-2xl md:block"
          style={{
            left: `${Math.min(position.x + 18, window.innerWidth - 290)}px`,
            top: `${position.y}px`,
          }}
        >
          <img
            src={image}
            alt={`${name} preview`}
            className="h-52 w-64 object-contain"
          />
        </div>
      )}
    </>
  );
}

export default function GearView() {
  const [results, setResults] = useState<Record<number, QueryRun | undefined>>({});
  const run = (index: number, result: QueryRun | null) =>
    setResults((previous) => {
      if (result) return { ...previous, [index]: result };
      const { [index]: _, ...remaining } = previous;
      return remaining;
    });
  const hasRun = (index: number, query: string) =>
    Boolean(results[index] && normalizePortfolioQuery(results[index]!.query) === normalizePortfolioQuery(query));
  const deskSetupQuery = "SELECT gear, purpose, product FROM gear WHERE type = 'desk_setup';";
  const everydayCarryQuery = "SELECT gear, purpose, product FROM gear WHERE type = 'everyday_carry';";
  const deskSetup = gearSections[0].items;
  const everydayCarry = gearSections[1].items;

  return (
    <div>
      {/* Description */}
      <div className="mb-7">
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-text-1">
          A work-from-home-ready setup built for development, testing,
          communication, and everyday productivity.
        </p>
      </div>

      {/* =========================
          DESK SETUP
          ========================= */}

      <PanelTitle>SQL editor</PanelTitle>

      <QueryEditor
        onRun={(result) => run(0, result)}
        formattedQuery={deskSetupQuery}
        explanation="Shows the desk setup used for development, testing, and daily work."
        lines={[
          <>
            {kw("SELECT")} gear, purpose, product {kw("FROM")} {fn("gear")}
          </>,
          <>
            {kw("WHERE")} type {kw("=")} {str("'desk_setup'")} ;
          </>,
        ]}
      />

      {hasRun(0, deskSetupQuery) && <ResultPanel
        label="Query result"
        meta={`${deskSetup.length} rows`}
      >
        <Grid
          headers={["gear", "purpose", "product link"]}
          fixedColumns={false}
          rows={deskSetup.map((item) => [
            <GearImagePreview
              key={item.name}
              image={item.image}
              name={item.name}
            />,
            item.detail,
            <a
              key={`${item.name}-link`}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="text-accent md:hover:underline"
            >
              product link
            </a>,
          ])}
        />
      </ResultPanel>}
      {results[0] && !hasRun(0, deskSetupQuery) && <QueryOutput result={results[0]} />}

      {/* =========================
          EVERYDAY CARRY
          ========================= */}

      <PanelTitle>SQL editor</PanelTitle>

      <QueryEditor
        onRun={(result) => run(1, result)}
        formattedQuery={everydayCarryQuery}
        explanation="Shows the everyday devices and accessories used on the go."
        lines={[
          <>
            {kw("SELECT")} gear, purpose, product {kw("FROM")} {fn("gear")}
          </>,
          <>
            {kw("WHERE")} type {kw("=")} {str("'everyday_carry'")} ;
          </>,
        ]}
      />

      {hasRun(1, everydayCarryQuery) && <ResultPanel
        label="Query result"
        meta={`${everydayCarry.length} rows`}
      >
        <Grid
          headers={["gear", "purpose", "product link"]}
          fixedColumns={false}
          rows={everydayCarry.map((item) => [
            <GearImagePreview
              key={item.name}
              image={item.image}
              name={item.name}
            />,
            item.detail,
            <a
              key={`${item.name}-link`}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="text-accent md:hover:underline"
            >
              product link
            </a>,
          ])}
        />
      </ResultPanel>}
      {results[1] && !hasRun(1, everydayCarryQuery) && <QueryOutput result={results[1]} />}
    </div>
  );
}
