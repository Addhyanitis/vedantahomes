export type NameSegment = { text: string; color: string };

export type NavLabels = {
  home?: string;
  spaces?: string;
  projects?: string;
  about?: string;
  book?: string;
};

export type CompanyInfo = {
  id: number;
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  stats: { value: string; label: string }[];
  about_text: string;
  logo_url: string;
  name_segments: NameSegment[];
  owner_name: string;
  owner_title: string;
  owner_bio: string;
  owner_image_url: string;
  nav_labels: NavLabels;
  hero_video_url: string;
  hero_poster_url: string;
  hero_video_enabled: boolean;
};

export const COMPANY_FALLBACK: CompanyInfo = {
  id: 1,
  name: "",
  tagline: "",
  phone: "",
  email: "",
  address: "",
  stats: [],
  about_text: "",
  logo_url: "",
  name_segments: [],
  owner_name: "",
  owner_title: "",
  owner_bio: "",
  owner_image_url: "",
  nav_labels: {},
  hero_video_url: "",
  hero_poster_url: "",
  hero_video_enabled: true,
};
