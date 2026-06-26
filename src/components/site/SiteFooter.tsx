import { Link } from "@tanstack/react-router";
import { COMPANY } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-surface py-14">
      <div className="container-page">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-brand text-white font-bold text-sm">
                R
              </span>
              <span className="text-lg font-semibold tracking-tight text-navy">
                {COMPANY.name}
              </span>
            </div>
            <p className="mt-4 text-sm text-zinc-500 text-pretty">
              {COMPANY.tagline} Building organized residential communities across
              southern India since 1998.
            </p>
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
                <li>{COMPANY.phone}</li>
                <li>{COMPANY.email}</li>
                <li className="max-w-[24ch]">{COMPANY.address}</li>
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
            © {new Date().getFullYear()} {COMPANY.name} Pvt Ltd. All plots are RERA approved.
          </p>
          <p className="text-xs text-zinc-400">
            Crafted for families. Engineered for legacy.
          </p>
        </div>
      </div>
    </footer>
  );
}
