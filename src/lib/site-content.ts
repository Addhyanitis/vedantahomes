import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  type CompanyInfo,
  type NameSegment,
  type NavLabels,
  COMPANY_FALLBACK,
} from "./site-content.types";
import { useCompanyContext } from "./company-context";

import plotAerialMain from "@/assets/plot-aerial-main.jpg";
import plotGate from "@/assets/plot-gate.jpg";
import plotRiverside from "@/assets/plot-riverside.jpg";
import plotOakridge from "@/assets/plot-oakridge.jpg";
import projectShowcase from "@/assets/project-showcase.jpg";
import projectVilla from "@/assets/project-villa.jpg";
import projectOngoing from "@/assets/project-ongoing.jpg";

export type Plot = {
  id: string;
  slug: string;
  name: string;
  location: string;
  area: string;
  facing: string;
  price: string;
  tag: string;
  image_url: string;
  description: string;
  sort_order: number;
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  status: string;
  year: string;
  units: string;
  image_url: string;
  blurb: string;
  sort_order: number;
};

export type { CompanyInfo, NameSegment, NavLabels };


const fallbackPlotImages = [
  plotAerialMain,
  plotGate,
  plotRiverside,
  plotOakridge,
  plotGate,
  plotAerialMain,
];
const fallbackProjectImages = [projectShowcase, projectVilla, projectOngoing];

export function plotImageUrl(plot: Plot, index = 0): string {
  return plot.image_url || fallbackPlotImages[index % fallbackPlotImages.length];
}
export function projectImageUrl(project: Project, index = 0): string {
  return (
    project.image_url || fallbackProjectImages[index % fallbackProjectImages.length]
  );
}
export { projectShowcase };

export const TAG_OPTIONS = ["PREMIUM", "FAST SELLING", "AVAILABLE", "NEW LAUNCH"];
export const STATUS_OPTIONS = ["Ongoing", "Completed"];

export const tagStyles: Record<string, string> = {
  PREMIUM: "bg-navy/10 text-navy",
  "FAST SELLING": "bg-orange-100 text-orange-700",
  AVAILABLE: "bg-green-100 text-green-700",
  "NEW LAUNCH": "bg-brand/10 text-brand",
};

export function plotTagClass(tag: string) {
  return tagStyles[tag] ?? "bg-zinc-100 text-zinc-700";
}

// --- Fetchers ---
async function fetchPlots(): Promise<Plot[]> {
  const { data, error } = await supabase
    .from("plots")
    .select("*")
    .order("sort_order")
    .order("created_at");
  if (error) throw error;
  return (data ?? []) as Plot[];
}

async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order")
    .order("created_at");
  if (error) throw error;
  return (data ?? []) as Project[];
}

async function fetchCompany(): Promise<CompanyInfo> {
  const { data, error } = await supabase
    .from("company_info")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw error;
  const c = data as unknown as CompanyInfo | null;
  return c ?? COMPANY_FALLBACK;
}


export function usePlots() {
  return useQuery({ queryKey: ["plots"], queryFn: fetchPlots });
}
export function useProjects() {
  return useQuery({ queryKey: ["projects"], queryFn: fetchProjects });
}
export function useCompany() {
  return useQuery({ queryKey: ["company"], queryFn: fetchCompany });
}
export { COMPANY_FALLBACK } from "./site-content.types";

