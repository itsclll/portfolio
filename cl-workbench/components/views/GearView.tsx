"use client";

import { useState } from "react";
import { gearSections } from "@/lib/data";
import QueryEditor, { fn, kw, str } from "@/components/QueryEditor";
import { ResultPanel, Grid, PanelTitle } from "@/components/ResultPanel";

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
  const [ran, setRan] = useState<boolean[]>([]);
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
        onRun={() => setRan((previous) => [...previous, 0])}
        formattedQuery="SELECT gear, purpose, product FROM gear WHERE type = 'desk_setup';"
        lines={[
          <>
            {kw("SELECT")} gear, purpose, product {kw("FROM")} {fn("gear")}
          </>,
          <>
            {kw("WHERE")} type {kw("=")} {str("'desk_setup'")} ;
          </>,
        ]}
      />

      {ran.includes(0) && <ResultPanel
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

      {/* =========================
          EVERYDAY CARRY
          ========================= */}

      <PanelTitle>SQL editor</PanelTitle>

      <QueryEditor
        onRun={() => setRan((previous) => [...previous, 1])}
        formattedQuery="SELECT gear, purpose, product FROM gear WHERE type = 'everyday_carry';"
        lines={[
          <>
            {kw("SELECT")} gear, purpose, product {kw("FROM")} {fn("gear")}
          </>,
          <>
            {kw("WHERE")} type {kw("=")} {str("'everyday_carry'")} ;
          </>,
        ]}
      />

      {ran.includes(1) && <ResultPanel
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
    </div>
  );
}