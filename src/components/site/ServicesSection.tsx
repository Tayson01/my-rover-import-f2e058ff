import { useMemo, useState } from "react";
import { ArrowRight, Clock, MapPin, Phone, ShieldCheck, Tag, Zap } from "lucide-react";

import { PHONE, TEL, services } from "@/lib/site-data";
import { ServiceIcon } from "@/components/site/ServiceIcon";
import { SectionLabel } from "@/components/site/ui";
import { Link } from "@tanstack/react-router";

type Category = "all" | "urgente" | "montaj" | "camioane";

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "Toate serviciile" },
  { id: "urgente", label: "Urgențe" },
  { id: "montaj", label: "Montaj & întreținere" },
  { id: "camioane", label: "Camioane & flote" },
];

const serviceCategory: Record<string, Category> = {
  "asistenta-rutiera": "urgente",
  "reparatii-pe-loc": "urgente",
  "transport-auto": "urgente",
  "montaj-domiciliu": "montaj",
  "echilibrare-roti": "montaj",
  "vulcanizare-camioane": "camioane",
};

const featuredSlug = "asistenta-rutiera";

function splitPrice(price: string): [string, string] {
  const [main = "", note = ""] = price.split("(");
  return [main.trim(), note.replace(")", "").trim()];
}

export function ServicesSection() {
  const [active, setActive] = useState<Category>("all");

  const filtered = useMemo(
    () =>
      services.filter(
        (s) => active === "all" || serviceCategory[s.slug] === active,
      ),
    [active],
  );

  const featured = services.find((s) => s.slug === featuredSlug)!;
  const rest = filtered.filter((s) => s.slug !== featuredSlug);
  const showFeatured = active === "all" || active === "urgente";
  const [featuredPriceMain, featuredPriceNote] = splitPrice(featured.price);

  return (
    <section id="servicii" className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <SectionLabel>Servicii</SectionLabel>
      <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="max-w-xl text-3xl font-extrabold sm:text-4xl tracking-tight">
            Tot ce ai nevoie, într-un singur loc.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            De la pene neașteptate pe drum până la întreținere programată — echipa noastră mobilă din
            Constanța se ocupă de tot.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const on = active === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                aria-pressed={on}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  on
                    ? "bg-brand text-brand-foreground shadow-card"
                    : "border border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured hero card */}
      {showFeatured && (
        <div className="group relative mt-10 overflow-hidden rounded-[28px] bg-gradient-to-br from-brand/40 via-brand/10 to-transparent p-[1.5px] shadow-card">
          <div className="relative overflow-hidden rounded-[26px] border border-border/60 bg-card p-6 sm:p-8 md:p-9">
            {/* glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-24 size-[280px] rounded-full bg-brand/15 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
            />

            {/* Top meta row */}
            <div className="relative flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand">
                  <Zap className="size-3" /> Cel mai solicitat
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                  <Clock className="size-3 text-brand" /> {featured.duration}
                </span>
              </div>

              <div className="inline-flex flex-col items-end rounded-2xl border border-brand/20 bg-brand/10 px-4 py-2 text-right">
                <span className="text-xl font-black leading-none text-brand sm:text-2xl">
                  {featuredPriceMain}
                </span>
                {featuredPriceNote && (
                  <span className="mt-1 max-w-[10rem] text-[10px] font-medium leading-tight text-muted-foreground sm:max-w-[12rem]">
                    {featuredPriceNote}
                  </span>
                )}
              </div>
            </div>

            <div className="relative mt-6 grid gap-8 md:mt-8 md:grid-cols-[1.3fr_1fr]">
              <div>
                <span className="flex size-14 items-center justify-center rounded-2xl bg-brand text-brand-foreground shadow-card">
                  <ServiceIcon name={featured.icon} className="size-7" />
                </span>

                <h3 className="mt-5 text-2xl font-extrabold tracking-tight md:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  {featured.intro}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    to="/servicii/$slug"
                    params={{ slug: featured.slug }}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition-all hover:brightness-110 hover:-translate-y-0.5"
                  >
                    Detalii complete <ArrowRight className="size-4" />
                  </Link>
                  <a
                    href={`tel:${TEL}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface"
                  >
                    <Phone className="size-4 text-brand" /> {PHONE}
                  </a>
                </div>
              </div>

              {/* How it works timeline */}
              <div className="relative rounded-2xl border border-border bg-surface/60 p-5 sm:p-6">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <MapPin className="size-3.5 text-brand" /> Cum funcționează
                </p>
                <ol className="relative mt-5 space-y-4">
                  {featured.steps.map((step, i) => {
                    const isLast = i === featured.steps.length - 1;
                    return (
                      <li key={step} className="flex gap-3">
                        <div className="relative flex flex-col items-center">
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-[10px] font-black text-brand-foreground">
                            {i + 1}
                          </span>
                          {!isLast && (
                            <span
                              aria-hidden
                              className="mt-1.5 block h-full min-h-[1.25rem] w-px bg-border"
                            />
                          )}
                        </div>
                        <p className="pb-2 text-sm leading-snug text-foreground/90">
                          {step}
                        </p>
                      </li>
                    );
                  })}
                </ol>
                <div className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                  <ShieldCheck className="size-3.5 shrink-0 text-brand" />
                  <span>Preț final comunicat înainte de plecare · Fără costuri ascunse</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of remaining services */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((s) => (
          <div
            key={s.slug}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-card"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-brand/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="relative flex items-start justify-between">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                <ServiceIcon name={s.icon} />
              </span>
              <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                {s.price}
              </span>
            </div>

            <h3 className="relative mt-5 text-lg font-bold">{s.title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>

            <div className="relative mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Clock className="size-3.5 text-brand" /> {s.duration}
            </div>

            {/* bullets on hover */}
            <ul className="relative mt-4 space-y-2 border-t border-border pt-4">
              {s.bullets.slice(0, 3).map((b) => (
                <li key={b} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/servicii/$slug"
              params={{ slug: s.slug }}
              className="relative mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand transition-all hover:gap-2.5"
            >
              Află mai mult <ArrowRight className="size-4" />
            </Link>
          </div>
        ))}
      </div>

      {/* CTA bar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-brand p-7 text-brand-foreground">
        <div>
          <p className="text-lg font-bold">Nu găsești ce cauți?</p>
          <p className="text-sm opacity-90">
            Sună-ne și îți oferim o soluție personalizată în câteva minute.
          </p>
        </div>
        <a
          href={`tel:${TEL}`}
          className="inline-flex items-center gap-2 rounded-xl bg-card px-5 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
        >
          <Phone className="size-4" /> Contactează-ne
        </a>
      </div>
    </section>
  );
}
