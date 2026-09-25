"use client";

import { useMemo, useState } from "react";
import type { IFAQ } from "@/models/schemas";

export function FaqAccordion({ faqs }: { faqs: IFAQ[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return faqs.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [faqs, query]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search FAQs"
        className="field mb-8 max-w-full sm:max-w-md"
      />
      <div className="space-y-3">
        {filtered.map((faq) => (
          <div key={faq.question} className="border border-white/10">
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-4 text-left"
              onClick={() => setOpen(open === faq.question ? null : faq.question)}
              aria-expanded={open === faq.question}
            >
              <span className="font-semibold">{faq.question}</span>
              <span className="text-electric">{open === faq.question ? "−" : "+"}</span>
            </button>
            {open === faq.question && <div className="border-t border-white/10 px-4 py-4 text-sm text-steel">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
