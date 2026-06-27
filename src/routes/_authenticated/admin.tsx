import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

const tabs = [
  { to: "/admin/plots", label: "Plots" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/company", label: "Company" },
  { to: "/admin/users", label: "Admins" },
] as const;

function AdminLayout() {
  return (
    <PageShell>
      <section className="bg-navy text-white py-10">
        <div className="container-page">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            Admin
          </span>
          <h1 className="mt-2 text-3xl font-semibold">Site Editor</h1>
          <p className="mt-1 text-sm text-zinc-300">
            Add, edit or remove anything that shows up on your public site.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className="rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium hover:bg-white/20"
                activeProps={{ className: "rounded-md bg-brand px-3 py-1.5 text-sm font-semibold text-white" }}
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-zinc-100 py-10 min-h-[60vh]">
        <div className="container-page">
          <Outlet />
        </div>
      </section>
    </PageShell>
  );
}
