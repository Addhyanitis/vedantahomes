import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PageShell } from "@/components/site/PageShell";
import { BookingForm } from "@/components/site/BookingForm";
import { COMPANY_FALLBACK, useCompany } from "@/lib/site-content";
import { Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";

const searchSchema = z.object({
  plot: z.string().optional(),
});

export const Route = createFileRoute("/book")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Book a Site Visit — Random Developers" },
      {
        name: "description",
        content:
          "Schedule a free guided site visit with Random Developers. Walk the land with an expert.",
      },
      { property: "og:title", content: "Book a Site Visit" },
      {
        property: "og:description",
        content: "Free, no-obligation guided land visit with our team.",
      },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const { plot } = Route.useSearch();
  const { data: company = COMPANY_FALLBACK } = useCompany();

  return (
    <PageShell>
      <section className="bg-navy text-white py-16 md:py-20">
        <div className="container-page">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            Book a Visit
          </span>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">
            Walk the land. <span className="text-brand">No obligation.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-300 text-pretty">
            Our site coordinators will pick a slot that works for you, share
            directions, and walk you through documentation, infrastructure and
            valuation on site.
          </p>
        </div>
      </section>

      <section className="bg-zinc-100 py-16 md:py-20">
        <div className="container-page grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-lg font-semibold">What's included</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "On-site documentation walk-through",
                  "Title & RERA verification details",
                  "Plot boundary demarcation",
                  "Bank-loan and EMI options",
                  "Future appreciation insights for the corridor",
                ].map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-zinc-700">
                    <CheckCircle2 className="size-4 text-brand shrink-0 mt-0.5" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5 space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-zinc-900">
                Or call us directly
              </h4>
              <a href={`tel:${company.phone.replace(/\s+/g, "")}`} className="flex items-center gap-3 text-sm text-zinc-700 hover:text-brand">
                <Phone className="size-4 text-brand" /> {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-3 text-sm text-zinc-700 hover:text-brand">
                <Mail className="size-4 text-brand" /> {company.email}
              </a>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm text-zinc-700 hover:text-brand">
                <MapPin className="size-4 text-brand mt-0.5" /> {company.address}
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <BookingForm defaultPlot={plot} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
