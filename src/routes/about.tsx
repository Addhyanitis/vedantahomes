import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { COMPANY, projectShowcase } from "@/lib/site-data";
import { ArrowRight, ShieldCheck, Award, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Random Developers" },
      {
        name: "description",
        content:
          "Random Developers has been shaping organized residential communities since 1998.",
      },
      { property: "og:title", content: "About Random Developers" },
      {
        property: "og:description",
        content: "25+ years of land development experience across southern India.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <section className="bg-surface py-16 md:py-24 border-b border-black/5">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              About us
            </span>
            <h1 className="mt-3 text-4xl md:text-5xl font-semibold text-zinc-900 leading-tight">
              Land developers who measure success in generations.
            </h1>
            <p className="mt-6 text-zinc-600 text-lg text-pretty">
              {COMPANY.name} has spent over two decades identifying high-growth
              land corridors and transforming them into organized residential
              communities — places people actually want to raise families in.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl ring-1 ring-black/5">
            <img src={projectShowcase} alt="Random Developers project" className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-zinc-100 py-16 md:py-20">
        <div className="container-page grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Award, title: "25+ years", text: "Of consistent delivery, since 1998." },
            { icon: Users, title: "4,200+ families", text: "Have made their home on our land." },
            { icon: ShieldCheck, title: "100% RERA", text: "Every project registered and title-clear." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl bg-white p-8 ring-1 ring-black/5">
              <c.icon className="size-6 text-brand" />
              <h3 className="mt-4 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-zinc-500">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-page max-w-3xl">
          <h2 className="text-3xl font-semibold text-zinc-900">Our promise</h2>
          <div className="mt-6 space-y-5 text-zinc-600 text-pretty leading-relaxed">
            <p>
              We don't sell speculation. Every plot we put on the market is a
              piece of land we'd buy ourselves — title-verified, infrastructure-ready,
              and located on a corridor with a clear ten-year growth story.
            </p>
            <p>
              Our internal team handles everything from land acquisition and
              layout planning to civil work and post-sale registration support.
              That means one accountable party from the first conversation to
              the day you build your home.
            </p>
            <p>
              If you're considering land as an investment or as the ground for
              your future home, we'd love to walk a site with you.
            </p>
          </div>
          <Link
            to="/book"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-medium text-white hover:brightness-110"
          >
            Schedule a site visit <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
