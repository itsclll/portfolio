"use client";

import { FormEvent, useState } from "react";
import { PanelTitle } from "@/components/ResultPanel";

export default function ContactView() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to send your message.");
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to send your message.";
      setError(message);
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <PanelTitle>Contact request</PanelTitle>
      <section className="border border-border rounded-md overflow-hidden bg-bg-1">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg-2">
          <div>
            <h1 className="text-sm font-semibold text-text-0">Create a contact request</h1>
            <p className="mt-1 text-[11px] text-text-2">Send a message to christian lucina</p>
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
              {error
                ? error
                : submitted
                  ? "request queued successfully"
                  : isSubmitting
                    ? "sending..."
                    : "status: ready to send"}
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded border border-accent bg-accent px-4 py-2 text-xs font-medium text-bg-0 transition-colors disabled:cursor-not-allowed disabled:opacity-60 md:hover:bg-[#66b7ff]"
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
