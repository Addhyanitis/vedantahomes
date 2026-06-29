import { Link } from "@tanstack/react-router";
import { useCompany, COMPANY_FALLBACK } from "@/lib/site-content";

export function SiteFooter() {
  const { data: company } = useCompany();
  const c = company ?? COMPANY_FALLBACK;
  const initial = (c.name?.trim()?.[0] ?? "R").toUpperCase();

  return (
    <footer className="border-t border-black/5 bg-surface py-14">
      <div className="container-page">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
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
            </div>
            {c.tagline && (
              <p className="mt-4 text-sm text-zinc-500 text-pretty">{c.tagline}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            <div className="space-y-3">
              <h5 className="text-xs font-semibold uppercase tracking-widest text-zinc-900">
                Explore
              </h5>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><Link to="/plots" className="hover:text-brand">Plots</Link></li>
                <li><Link to="/projects" className="hover:text-brand">Projects</Link></li>
                <li><Link to="/about" className="hover:text-brand">About</Link></li>
                <li><Link to="/book" className="hover:text-brand">Book Visit</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h5 className="text-xs font-semibold uppercase tracking-widest text-zinc-900">
                Contact
              </h5>
              <ul className="space-y-2 text-sm text-zinc-500">
                {c.phone && <li><a href={`tel:${c.phone.replace(/\s+/g, "")}`} className="hover:text-brand">{c.phone}</a></li>}
                {c.email && <li><a href={`mailto:${c.email}`} className="hover:text-brand">{c.email}</a></li>}
                {c.address && <li className="max-w-[24ch]"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address)}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand">{c.address}</a></li>}
              </ul>
            </div>
            <div className="space-y-3">
              <h5 className="text-xs font-semibold uppercase tracking-widest text-zinc-900">
                Compliance
              </h5>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li>RERA Approved</li>
                <li>Clear Titles</li>
                <li>Bank Approved Loans</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} {c.name}. All plots are RERA approved.
          </p>
          <p className="text-xs text-zinc-400">
            Crafted for families. Engineered for legacy.
          </p>
        </div>
      </div>
    </footer>
  );
}
