import type { CompanyInfo } from "@/lib/site-content";

export function BrandLoader({ company }: { company?: CompanyInfo | null }) {
  const c = company;
  const displayName = c?.name?.trim() || "VEDANTA HOMES";
  const initial = displayName[0]?.toUpperCase() ?? "V";
  const hasSegments = c?.name_segments && c.name_segments.length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-surface" data-brand-loader>
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-brand/10 animate-ping" />
        <div className="relative z-10">
          {c?.logo_url ? (
            <img
              src={c.logo_url}
              alt={`${c.name ?? "Company"} logo`}
              className="h-14 w-14 rounded-lg object-contain bg-white p-1 shadow-sm"
            />
          ) : (
            <span className="grid h-14 w-14 place-items-center rounded-lg bg-brand text-white font-bold text-2xl">
              {initial}
            </span>
          )}
        </div>
      </div>

      <p className="text-lg font-semibold tracking-tight text-navy">
        {hasSegments
          ? c.name_segments!.map((s, i) => (
              <span key={i} style={{ color: s.color || undefined }}>
                {s.text}
              </span>
            ))
          : displayName}
      </p>
    </div>
  );
}

