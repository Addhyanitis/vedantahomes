import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { projectImageUrl, useProjects } from "@/lib/site-content";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects" },
      {
        name: "description",
        content:
          "A portfolio of our completed and ongoing developments.",
      },
      { property: "og:title", content: "Projects" },
      {
        property: "og:description",
        content: "Completed and ongoing real estate projects.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { data: projects = [], isLoading } = useProjects();

  return (
    <PageShell>
      <section className="bg-surface py-16 md:py-20 border-b border-black/5">
        <div className="container-page">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            Portfolio
          </span>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold text-zinc-900">
            Our Projects
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-600 text-pretty">
            A track record of delivered townships, gated communities and
            ongoing developments — each one engineered for long-term value.
          </p>
        </div>
      </section>

      <section className="bg-zinc-100 py-16 md:py-24">
        <div className="container-page space-y-10">
          {isLoading ? (
            <p className="text-center text-zinc-500">Loading…</p>
          ) : projects.length === 0 ? (
            <p className="text-center text-zinc-500">No projects yet.</p>
          ) : (
            projects.map((p, i) => (
              <article
                key={p.slug}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-3xl bg-white p-6 md:p-8 ring-1 ring-black/5 ${
                  i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="overflow-hidden rounded-2xl bg-zinc-100">
                  <img
                    src={projectImageUrl(p, i)}
                    alt={p.name}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div>
                  <span
                    className={`inline-block rounded px-2 py-1 text-[10px] font-bold tracking-wider ${
                      p.status === "Ongoing"
                        ? "bg-brand/10 text-brand"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {p.status.toUpperCase()}
                  </span>
                  <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-zinc-900">
                    {p.name}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    {p.year} · {p.units}
                  </p>
                  <p className="mt-4 text-zinc-600 text-pretty">{p.blurb}</p>
                  <Link
                    to="/book"
                    className="mt-6 inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2.5 text-sm font-medium text-white hover:brightness-110"
                  >
                    Visit this project
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </PageShell>
  );
}
