import { Building2 } from "lucide-react";
import type { CompanyInfo } from "@/lib/site-content";

export function BrandLoader({ company }: { company?: CompanyInfo | null }) {
  const c = company;
  const initial = (c?.name?.trim()?.[0] ?? "").toUpperCase();
  const hasSegments = c?.name_segments && c.name_segments.length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-surface">
      <div className="relative grid h-24 w-24 place-items-center">
        <div className="absolute inset-0 rounded-full border-[3px] border-brand/15 border-t-brand animate-spin" />
        <div className="absolute inset-2 rounded-full border-[3px] border-navy/10 border-b-navy animate-spin [animation-direction:reverse]" />
        <div className="relative z-10">
          {c?.logo_url ? (
            <img
              src={c.logo_url}
              alt={`${c.name ?? "Company"} logo`}
              className="h-14 w-14 rounded-lg object-contain bg-white p-1 shadow-sm"
            />
          ) : initial ? (
            <span className="grid h-14 w-14 place-items-center rounded-lg bg-brand text-white font-bold text-2xl">
              {initial}
            </span>
          ) : (
            <span className="grid h-14 w-14 place-items-center rounded-lg bg-brand text-white">
              <Building2 className="h-8 w-8" />
            </span>
          )}
        </div>
      </div>

      {c?.name && (
        <p className="text-lg font-semibold tracking-tight text-navy">
          {hasSegments
            ? c.name_segments!.map((s, i) => (
                <span key={i} style={{ color: s.color || undefined }}>
                  {s.text}
                </span>
              ))
            : c.name}
        </p>
      )}
    </div>
  );
}
