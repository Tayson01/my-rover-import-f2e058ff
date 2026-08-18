import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";

import { Btn, SectionLabel } from "@/components/site/ui";
import { PHONE, TEL, WA, faqs } from "@/lib/site-data";

export const Route = createFileRoute("/intrebari-frecvente")({
  head: () => ({
    meta: [
      { title: "Întrebări frecvente — Vulcanizare mobilă Constanța" },
      {
        name: "description",
        content:
          "Prețuri, timpi de sosire, servicii pe loc, plata cu cardul și intervenții pentru camioane — răspunsuri clare despre vulcanizarea mobilă în Constanța.",
      },
      { property: "og:title", content: "Întrebări frecvente — Vulcanizare mobilă Constanța" },
      {
        property: "og:description",
        content: "Tot ce vrei să știi înainte să suni: prețuri, timpi de sosire și servicii disponibile.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <SectionLabel>Întrebări frecvente</SectionLabel>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Tot ce vrei să știi înainte să suni.</h1>

      <div className="mt-10 space-y-3">
        {faqs.map((f, i) => (
          <div key={f.q} className="rounded-2xl border border-border bg-card">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold"
              aria-expanded={open === i}
            >
              {f.q}
              <ChevronDown
                className={`size-4 shrink-0 text-brand transition-transform ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            {open === i && (
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Btn href={`tel:${TEL}`}>
          <Phone className="size-4" /> Sună: {PHONE}
        </Btn>
        <Btn href={WA} variant="ghost">
          Întreabă pe WhatsApp
        </Btn>
      </div>
    </main>
  );
}
