import { Link, useNavigate } from "@tanstack/react-router";
import { CalendarDays, Menu, X, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import { useIsAdmin } from "@/lib/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useCompany, COMPANY_FALLBACK } from "@/lib/site-content";

const defaultLabels = { home: "Home", spaces: "Spaces", projects: "Projects", about: "About", book: "Book Site Visit" };

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { user, isAdmin } = useIsAdmin();
  const navigate = useNavigate();
  const { data: company } = useCompany();
  const c = company ?? COMPANY_FALLBACK;
  const initial = (c.name?.trim()?.[0] ?? "R").toUpperCase();
  const nl = c.nav_labels ?? {};
  const links = [
    { to: "/" as const, label: nl.home || defaultLabels.home },
    { to: "/plots" as const, label: nl.spaces || defaultLabels.spaces },
    { to: "/projects" as const, label: nl.projects || defaultLabels.projects },
    { to: "/about" as const, label: nl.about || defaultLabels.about },
  ];
  const bookLabel = nl.book || defaultLabels.book;

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/5 bg-surface/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2">
            {c.logo_url ? (
              <img src={c.logo_url} alt={`${c.name} logo`} className="h-8 w-8 rounded-md object-contain bg-white ring-1 ring-black/5" />
            ) : (
              <span className="grid h-8 w-8 place-items-center rounded-md bg-brand text-white font-bold text-sm">
                {initial}
              </span>
            )}
            <span className="text-lg font-semibold tracking-tight text-navy">
              {c.name_segments && c.name_segments.length > 0
                ? c.name_segments.map((s, i) => (
                    <span key={i} style={{ color: s.color || undefined }}>{s.text}</span>
                  ))
                : c.name}
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-brand"
                activeProps={{ className: "text-brand" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <Link
              to="/admin/plots"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-navy ring-1 ring-navy/20 hover:ring-navy/40"
            >
              <Settings className="size-4" /> Admin
            </Link>
          )}
          {user ? (
            <button
              onClick={signOut}
              title="Sign out"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-md px-2 py-2 text-sm text-zinc-600 hover:text-brand"
            >
              <LogOut className="size-4" />
            </button>
          ) : (
            <Link
              to="/auth"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:text-brand"
            >
              Sign in
            </Link>
          )}
          <Link
            to="/book"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-2 text-sm font-medium text-white ring-1 ring-brand transition hover:brightness-110"
          >
            <CalendarDays className="size-4" />
            {bookLabel}
          </Link>
          <button
            className="md:hidden grid h-9 w-9 place-items-center rounded-md ring-1 ring-black/5"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/5 bg-surface">
          <div className="container-page py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-zinc-700 hover:text-brand"
              >
                {l.label}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin/plots" onClick={() => setOpen(false)} className="text-sm font-medium text-navy">
                Admin
              </Link>
            )}
            {user ? (
              <button onClick={() => { setOpen(false); signOut(); }} className="text-left text-sm font-medium text-zinc-700">
                Sign out
              </button>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)} className="text-sm font-medium text-zinc-700">
                Sign in
              </Link>
            )}
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md bg-brand px-3 py-2 text-sm font-medium text-white"
            >
              <CalendarDays className="size-4" />
              {bookLabel}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
