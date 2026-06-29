import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import {
  COMPANY_FALLBACK,
  plotImageUrl,
  usePlots,
  useCompany,
} from "@/lib/site-content";
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
        content: "Years of land development experience across southern India.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { data: company = COMPANY_FALLBACK } = useCompany();
  const { data: plots = [] } = usePlots();
  const heroImg = plots[0] ? plotImageUrl(plots[0], 0) : undefined;

  const cards = [
    { icon: Award, title: company.stats[0]?.value ?? "—", text: company.stats[0]?.label ?? "" },
    { icon: Users, title: company.stats[1]?.value ?? "—", text: company.stats[1]?.label ?? "" },
    { icon: ShieldCheck, title: company.stats[2]?.value ?? "—", text: company.stats[2]?.label ?? "" },
  ];

  return (
    <PageShell>
      <section className="bg-surface py-16 md:py-24 border-b border-black/5">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              About us
            </span>
            <h1 className="mt-3 text-4xl md:text-5xl font-semibold text-zinc-900 leading-tight">
              {company.tagline || "Land developers who measure success in generations."}
            </h1>
            <p className="mt-6 text-zinc-600 text-lg text-pretty">
              {company.about_text ||
                `${company.name} curates land in high-growth corridors and transforms it into organized residential communities.`}
            </p>
          </div>
          {heroImg && (
            <div className="overflow-hidden rounded-2xl ring-1 ring-black/5">
              <img src={heroImg} alt={company.name} className="aspect-[4/3] w-full object-cover" />
            </div>
          )}
        </div>
      </section>

      <section className="bg-zinc-100 py-16 md:py-20">
        <div className="container-page grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <div key={i} className="rounded-2xl bg-white p-8 ring-1 ring-black/5">
              <c.icon className="size-6 text-brand" />
              <h3 className="mt-4 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-zinc-500">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-page max-w-3xl">
          <h2 className="text-3xl font-semibold text-zinc-900">Get in touch</h2>
          <div className="mt-6 space-y-3 text-zinc-600">
            <p><strong className="text-zinc-900">Phone:</strong> <a href={`tel:${company.phone.replace(/\s+/g, "")}`} className="hover:text-brand">{company.phone}</a></p>
            <p><strong className="text-zinc-900">Email:</strong> <a href={`mailto:${company.email}`} className="hover:text-brand">{company.email}</a></p>
            <p><strong className="text-zinc-900">Address:</strong> <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand">{company.address}</a></p>
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
