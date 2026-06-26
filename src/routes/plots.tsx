import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PlotCard } from "@/components/site/PlotCard";
import { PLOTS } from "@/lib/site-data";

export const Route = createFileRoute("/plots")({
  head: () => ({
    meta: [
      { title: "Plots & Lands — Random Developers" },
      {
        name: "description",
        content:
          "Browse RERA-approved residential plots, villa land and farmland from Random Developers.",
      },
      { property: "og:title", content: "Plots & Lands — Random Developers" },
      {
        property: "og:description",
        content: "Browse our current inventory of premium plots.",
      },
    ],
  }),
  component: PlotsPage,
});

function PlotsPage() {
  return (
    <PageShell>
      <section className="bg-surface py-16 md:py-20 border-b border-black/5">
        <div className="container-page">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            Inventory
          </span>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold text-zinc-900">
            Plots & Lands
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-600 text-pretty">
            Hand-picked land parcels across Bengaluru's most promising growth
            corridors. Every plot is RERA approved, title-verified and bank-loan ready.
          </p>
        </div>
      </section>

      <section className="bg-zinc-100 py-16 md:py-20">
        <div className="container-page">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLOTS.map((plot) => (
              <PlotCard key={plot.slug} plot={plot} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
