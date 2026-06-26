import plotAerialMain from "@/assets/plot-aerial-main.jpg";
import plotGate from "@/assets/plot-gate.jpg";
import plotRiverside from "@/assets/plot-riverside.jpg";
import plotOakridge from "@/assets/plot-oakridge.jpg";
import projectShowcase from "@/assets/project-showcase.jpg";
import projectVilla from "@/assets/project-villa.jpg";
import projectOngoing from "@/assets/project-ongoing.jpg";

export type Plot = {
  slug: string;
  name: string;
  location: string;
  area: string;
  facing: string;
  price: string;
  tag: "PREMIUM" | "FAST SELLING" | "AVAILABLE" | "NEW LAUNCH";
  image: string;
  description: string;
};

export const PLOTS: Plot[] = [
  {
    slug: "emerald-valley-phase-2",
    name: "Emerald Valley Phase II",
    location: "Mysuru Road Corridor, Bengaluru",
    area: "1,800 – 3,200 sq.ft",
    facing: "Multiple",
    price: "₹1.2 Cr – 1.8 Cr",
    tag: "PREMIUM",
    image: plotAerialMain,
    description:
      "Flagship gated township spread across 42 acres with clubhouse, parks, 40ft internal roads and 24x7 security. RERA approved with clear titles.",
  },
  {
    slug: "skyline-vista",
    name: "Skyline Vista",
    location: "Sarjapur Growth Hub",
    area: "2,400 sq.ft",
    facing: "North",
    price: "₹84 Lakhs",
    tag: "FAST SELLING",
    image: plotGate,
    description:
      "Premium villa plots adjacent to the upcoming peripheral ring road. Walkable to schools and tech parks.",
  },
  {
    slug: "riverside-meadows",
    name: "Riverside Meadows",
    location: "North Bangalore",
    area: "1,200 sq.ft",
    facing: "East · Corner",
    price: "₹42 Lakhs",
    tag: "AVAILABLE",
    image: plotRiverside,
    description:
      "Compact, ready-to-register residential plots ideal for first-time investors and end-users.",
  },
  {
    slug: "oak-ridge-estate",
    name: "Oak Ridge Estate",
    location: "Chikkaballapur Outskirts",
    area: "4,000 sq.ft",
    facing: "Farmland",
    price: "₹2.1 Cr",
    tag: "PREMIUM",
    image: plotOakridge,
    description:
      "Managed farm-land plots with planted timber, drip irrigation and a shared organic produce facility.",
  },
  {
    slug: "astra-meadows",
    name: "Astra Meadows",
    location: "Electronic City Phase 3",
    area: "1,500 – 2,400 sq.ft",
    facing: "North-West",
    price: "₹65 Lakhs onwards",
    tag: "NEW LAUNCH",
    image: plotGate,
    description:
      "Newly launched residential layout with underground utilities, jogging track and a 1.2 acre central park.",
  },
  {
    slug: "grand-reserve",
    name: "The Grand Reserve",
    location: "Devanahalli",
    area: "5,000+ sq.ft",
    facing: "Corner / Premium",
    price: "₹1.6 Cr onwards",
    tag: "PREMIUM",
    image: plotAerialMain,
    description:
      "Estate-sized plots near the airport corridor, suited for luxury villa construction.",
  },
];

export type Project = {
  slug: string;
  name: string;
  status: "Completed" | "Ongoing";
  year: string;
  units: string;
  image: string;
  blurb: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "meridian-park",
    name: "Meridian Park",
    status: "Completed",
    year: "2023",
    units: "180 villa plots",
    image: projectShowcase,
    blurb:
      "Our flagship gated community delivered ahead of schedule, now home to over 150 families.",
  },
  {
    slug: "pine-district",
    name: "Pine District Estates",
    status: "Completed",
    year: "2021",
    units: "120 residential units",
    image: projectVilla,
    blurb:
      "Mid-rise villas with shared amenities, fully sold out within nine months of launch.",
  },
  {
    slug: "azure-heights",
    name: "Azure Heights",
    status: "Ongoing",
    year: "Delivery 2026",
    units: "240 plots · 56 acres",
    image: projectOngoing,
    blurb:
      "Currently under development on the Devanahalli corridor — phase one is 70% booked.",
  },
];

export const COMPANY = {
  name: "Random Developers",
  tagline: "Premium land. Generational ground.",
  phone: "+91 98765 43210",
  email: "hello@randomdevelopers.in",
  address: "12th Floor, Skyline Tower, MG Road, Bengaluru 560001",
  stats: [
    { value: "25+", label: "Years Experience" },
    { value: "4.2k", label: "Happy Families" },
    { value: "18", label: "Projects Delivered" },
  ],
};

export { projectShowcase };
