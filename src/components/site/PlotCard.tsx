import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { plotImageUrl, plotTagClass, type Plot } from "@/lib/site-content";

export function PlotCard({ plot, index = 0 }: { plot: Plot; index?: number }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition hover:ring-brand/30 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        <img
          src={plotImageUrl(plot, index)}
          alt={plot.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-4 top-4 rounded px-2 py-1 text-[10px] font-bold tracking-wider ${plotTagClass(plot.tag)}`}
        >
          {plot.tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-zinc-900">{plot.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500">
          <MapPin className="size-3.5" />
          {plot.location}
        </p>
        <div className="my-4 grid grid-cols-2 gap-3 border-y border-black/5 py-3 text-xs">
          <div>
            <div className="font-medium uppercase tracking-wider text-zinc-400">Area</div>
            <div className="mt-0.5 font-semibold text-zinc-800">{plot.area}</div>
          </div>
          <div>
            <div className="font-medium uppercase tracking-wider text-zinc-400">Facing</div>
            <div className="mt-0.5 font-semibold text-zinc-800">{plot.facing}</div>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-base font-semibold text-navy">{plot.price}</span>
          <Link
            to="/book"
            search={{ plot: plot.slug }}
            className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline underline-offset-4"
          >
            Book visit <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
