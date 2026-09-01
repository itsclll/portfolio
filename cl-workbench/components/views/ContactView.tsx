"use client";

import { FormEvent, useState } from "react";
import { PanelTitle } from "@/components/ResultPanel";

export default function ContactView() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <PanelTitle>Contact request</PanelTitle>
      <section className="border border-border rounded-md overflow-hidden bg-bg-1">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg-2">
          <div>
            <h1 className="text-sm font-semibold text-text-0">Create a contact request</h1>
            <p className="mt-1 text-[11px] text-text-2">Send a message to christian_portfolio</p>
          </div>
          <span className="text-[10px] text-green border border-green/30 bg-green/10 rounded px-2 py-1">
            accepting requests
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-4 py-4">
          <label className="block">
            <span className="mb-1.5 block text-[11px] text-accent">"name" :</span>
            <input
              required
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full rounded border border-border bg-bg-0 px-3 py-2.5 text-xs text-text-0 outline-none placeholder:text-text-2 focus:border-accent"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[11px] text-accent">"email" :</span>
            <input
              required
              name="email"
              type="email"
              placeholder="youremail@gmail.com"
              className="w-full rounded border border-border bg-bg-0 px-3 py-2.5 text-xs text-text-0 outline-none placeholder:text-text-2 focus:border-accent"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[11px] text-accent">"message" :</span>
            <textarea
              required
              name="message"
              rows={6}
              placeholder="Type your message here..."
              className="w-full resize-y rounded border border-border bg-bg-0 px-3 py-2.5 text-xs leading-relaxed text-text-0 outline-none placeholder:text-text-2 focus:border-accent"
            />
          </label>

          <div className="flex items-center justify-between gap-4 pt-1">
            <p className="text-[10px] text-text-2" aria-live="polite">
              {submitted ? "request queued successfully" : "status: ready to send"}
            </p>
            <button
              type="submit"
              className="rounded border border-accent bg-accent px-4 py-2 text-xs font-medium text-bg-0 transition-colors md:hover:bg-[#66b7ff]"
            >
              Send message
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
