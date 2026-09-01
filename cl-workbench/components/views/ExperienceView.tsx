"use client";

import { useState } from "react";
import QueryEditor, { kw, fn } from "@/components/QueryEditor";
import { ResultPanel, Grid, PanelTitle } from "@/components/ResultPanel";
import { experience, responsibilities } from "@/lib/data";

function formatMonthYear(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function RecognitionPreview({
  company,
  images,
}: {
  company: string;
  images: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="whitespace-nowrap rounded border border-border px-2 py-1 text-[10px] text-accent md:hover:border-accent"
      >
        View images
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setIsOpen(false)}
          role="presentation"
        >
          <div
            className="relative max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-md border border-border bg-bg-1 p-3 shadow-2xl sm:p-4"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${company} credentials`}
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <div className="text-xs text-text-0">{company} credentials</div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="border border-border px-2 py-1 text-xs text-text-1 md:hover:border-accent md:hover:text-text-0"
                aria-label="Close credentials"
              >
                X
              </button>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2">
              {images.map((image, index) => (
                <div key={image} className="flex h-full items-center justify-center self-start overflow-hidden rounded border border-border bg-bg-0">
                  <img
                    src={image}
                    alt={`${company} recognition ${index + 1}`}
                    className="block h-auto max-h-[78vh] w-full object-contain"
                    onError={(event) => {
                      if (!event.currentTarget.src.endsWith("/photo.jpg")) {
                        event.currentTarget.src = "/photo.jpg";
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ExperienceView() {
  return (
    <div>
      <PanelTitle>SQL editor</PanelTitle>
      <QueryEditor
        lines={[
          <>
            {kw("SELECT")}
          </>,
          <>
            &nbsp;&nbsp;id,
          </>,
          <>
            &nbsp;&nbsp;role,
          </>,
          <>
            &nbsp;&nbsp;company,
          </>,
          <>
            &nbsp;&nbsp;{kw("DATE_FORMAT")}(start_date, {'%b %Y'}) {kw("AS")} start_date,
          </>,
          <>
            &nbsp;&nbsp;{kw("DATE_FORMAT")}(end_date, {'%b %Y'}) {kw("AS")} end_date
          </>,
          <>
            {kw("FROM")} {fn("experience")}
          </>,
          <>
            {kw("ORDER BY")} start_date {kw("DESC")};
          </>,
        ]}
      />

      <ResultPanel label="Query result" meta={`${experience.length} rows`}>
        <Grid
          headers={["id", "role", "company", "start_date", "end_date"]}
          rows={experience.map((e) => [
            e.id,
            <span className="text-text-0 font-medium" key={e.role}>{e.role}</span>,
            e.company,
            formatMonthYear(e.start_date),
            formatMonthYear(e.end_date),
          ])}
        />
      </ResultPanel>

      {experience.map((e) => {
        const experienceResponsibilities = responsibilities.filter((item) => item.experience_id === e.id);

        return (
          <div key={e.id}>
            <PanelTitle>Role detail — {e.company}</PanelTitle>
            <QueryEditor
              lines={[
                <>
                  {kw("SELECT")} responsibility {kw("FROM")} {fn("responsibilities")}
                </>,
                <>
                  {kw("WHERE")} experience_id {kw("=")} {e.id};
                </>,
              ]}
            />
            <ResultPanel label="Query result" meta={`${experienceResponsibilities.length} rows`}>
              <Grid
                headers={["responsibility"]}
                rows={experienceResponsibilities.map((item) => [
                  <span className="block w-full leading-relaxed md:w-3/4" key={item.responsibility}>
                    {item.responsibility}
                  </span>,
                ])}
              />
            </ResultPanel>
          </div>
        );
      })}
    </div>
  );
}
