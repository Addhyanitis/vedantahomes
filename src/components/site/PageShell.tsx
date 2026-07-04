import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { useCompany } from "@/lib/site-content";
import { BrandLoader } from "./BrandLoader";

export function PageShell({ children }: { children: ReactNode }) {
  const { data: company, isLoading } = useCompany();
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!isLoading && company) {
      const timer = setTimeout(() => setReady(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading, company]);

  useEffect(() => {
    if (ready) {
      const timer = setTimeout(() => setHidden(true), 500);
      return () => clearTimeout(timer);
    }
  }, [ready]);

  return (
    <div className="min-h-screen bg-surface text-ink flex flex-col">
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      {!hidden && (
        <div
          className={[
            "fixed inset-0 z-[100] transition-opacity duration-500 ease-out",
            ready ? "opacity-0 pointer-events-none" : "opacity-100",
          ].join(" ")}
          aria-hidden={ready}
        >
          <BrandLoader company={company} />
        </div>
      )}
    </div>
  );
}
