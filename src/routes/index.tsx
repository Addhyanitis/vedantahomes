import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, ShieldCheck, Sparkles, Phone, Mail } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { BookingForm } from "@/components/site/BookingForm";
import {
  usePlots,
  useCompany,
  plotImageUrl,
  COMPANY_FALLBACK,
} from "@/lib/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Random Developers — Premium Residential Plots in Bengaluru" },
      {
        name: "description",
        content:
          "RERA-approved residential plots, gated communities and farmland. Book a free guided site visit with Random Developers.",
      },
      { property: "og:title", content: "Random Developers — Premium Residential Plots" },
      {
        property: "og:description",
        content: "Infrastructure-ready land parcels with clear titles.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data: plots = [] } = usePlots();
  const { data: company = COMPANY_FALLBACK } = useCompany();
  const featured = plots.slice(0, 4);
  const main = featured[0];
  const rest = featured.slice(1);

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative bg-surface py-16 md:py-24 overflow-hidden">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <Sparkles className="size-3.5" /> RERA Approved · Clear Titles
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-semibold text-zinc-900 leading-[1.05] text-balance">
              Find your ground in the heart of the valley.
            </h1>
            <p className="mt-6 max-w-[58ch] text-base sm:text-lg text-zinc-600 text-pretty">
              {company.tagline || "Premium residential plots designed for generational growth."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/plots"
                className="inline-flex items-center gap-2 rounded-md bg-navy px-5 py-3 text-sm font-medium text-white ring-1 ring-navy transition hover:brightness-110"
              >
                Browse Listings <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-medium text-zinc-900 ring-1 ring-black/10 transition hover:ring-brand/40"
              >
                Schedule a site visit
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {company.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-semibold text-navy">{s.value}</div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* FEATURED PLOTS — Bento */}
      {main && (
        <section className="bg-zinc-100 py-20 md:py-24">
          <div className="container-page">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-xs font-semibold text-brand uppercase tracking-widest">
                  Featured Listings
                </span>
                <h2 className="mt-2 text-3xl md:text-4xl font-semibold text-zinc-900">
                  Active Land Parcels
                </h2>
              </div>
              <Link
                to="/plots"
                className="hidden sm:inline-flex text-sm font-medium text-brand hover:underline underline-offset-4"
              >
                View all {plots.length} plots →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
              <article className="md:col-span-2 md:row-span-2 group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition hover:ring-brand/30">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={plotImageUrl(main, 0)} alt={main.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded bg-navy/10 px-2 py-1 text-[10px] font-bold tracking-wider text-navy backdrop-blur">
                    {main.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold text-zinc-900">{main.name}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500">
                    <MapPin className="size-3.5" /> {main.location}
                  </p>
                  <p className="mt-4 text-sm text-zinc-600 text-pretty">{main.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-black/5">
                    <span className="text-lg font-semibold text-navy">{main.price}</span>
                    <Link
                      to="/book"
                      search={{ plot: main.slug }}
                      className="inline-flex items-center gap-1 text-sm font-medium text-brand"
                    >
                      Book visit <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </article>

              {rest[0] && (
                <article className="md:col-span-2 group flex gap-4 overflow-hidden rounded-2xl bg-white p-4 ring-1 ring-black/5 transition hover:ring-brand/30">
                  <div className="h-full w-40 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                    <img src={plotImageUrl(rest[0], 1)} alt={rest[0].name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <h4 className="text-base font-semibold text-zinc-900">{rest[0].name}</h4>
                      <p className="text-xs text-zinc-500">{rest[0].area} · {rest[0].facing}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-navy">{rest[0].price}</span>
                      <Link to="/plots" className="text-xs font-medium text-brand">View →</Link>
                    </div>
                  </div>
                </article>
              )}

              {rest.slice(1).map((plot, i) => (
                <article
                  key={plot.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white p-4 ring-1 ring-black/5 transition hover:ring-brand/30"
                >
                  <div className="aspect-video w-full overflow-hidden rounded-lg bg-zinc-100 mb-3">
                    <img src={plotImageUrl(plot, i + 2)} alt={plot.name} className="h-full w-full object-cover" />
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-900">{plot.name}</h4>
                  <p className="text-xs text-zinc-500">{plot.area} · {plot.facing}</p>
                  <span className="mt-auto pt-2 text-sm font-semibold text-navy">{plot.price}</span>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TRUST STRIP */}
      <section className="bg-white py-16">
        <div className="container-page grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, title: "RERA approved", text: "Every plot we sell is registered and title-verified." },
            { icon: Sparkles, title: "Infrastructure ready", text: "40ft roads, drainage, utilities — done before handover." },
            { icon: MapPin, title: "High-growth corridors", text: "Located along Bengaluru's strongest appreciation belts." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl bg-surface p-6 ring-1 ring-black/5">
              <f.icon className="size-5 text-brand" />
              <h4 className="mt-4 font-semibold text-zinc-900">{f.title}</h4>
              <p className="mt-1 text-sm text-zinc-500 text-pretty">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT BAND */}
      <section className="bg-navy py-20 md:py-24 text-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              About the developer
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold leading-tight">
              {company.name}
            </h2>
            <p className="mt-6 max-w-[56ch] text-zinc-300 text-pretty">
              {company.about_text ||
                "We curate land in high-growth corridors and transform it into organized residential communities."}
            </p>
            <div className="mt-10 grid grid-cols-3 gap-8 max-w-md">
              {company.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-semibold">{s.value}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-zinc-400">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
            >
              Read our full story <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden ring-1 ring-white/10">
            {plots[0] && (
              <img
                src={plotImageUrl(plots[0], 0)}
                alt={plots[0].name}
                className="w-full aspect-[4/3] object-cover"
              />
            )}
          </div>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="bg-surface py-14 border-t border-black/5">
        <div className="container-page">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand">Get in touch</span>
              <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-zinc-900">Talk to our land advisors</h2>
            </div>
            <Link to="/book" className="text-sm font-medium text-brand hover:underline inline-flex items-center gap-1">
              Or book a site visit <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {company.phone && (
              <a href={`tel:${company.phone.replace(/\s+/g, "")}`} className="group flex items-start gap-4 rounded-2xl bg-white p-6 ring-1 ring-black/5 hover:ring-brand transition">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-brand/10 text-brand"><Phone className="size-5" /></span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Call</div>
                  <div className="mt-1 text-zinc-900 font-medium group-hover:text-brand">{company.phone}</div>
                </div>
              </a>
            )}
            {company.email && (
              <a href={`mailto:${company.email}`} className="group flex items-start gap-4 rounded-2xl bg-white p-6 ring-1 ring-black/5 hover:ring-brand transition">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-brand/10 text-brand"><Mail className="size-5" /></span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Email</div>
                  <div className="mt-1 text-zinc-900 font-medium group-hover:text-brand break-all">{company.email}</div>
                </div>
              </a>
            )}
            {company.address && (
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 rounded-2xl bg-white p-6 ring-1 ring-black/5 hover:ring-brand transition">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-brand/10 text-brand"><MapPin className="size-5" /></span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Visit</div>
                  <div className="mt-1 text-zinc-900 font-medium group-hover:text-brand">{company.address}</div>
                </div>
              </a>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
