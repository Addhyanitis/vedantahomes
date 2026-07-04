import { createServerFn } from "@tanstack/react-start";
import { type CompanyInfo, COMPANY_FALLBACK } from "./site-content.types";

export const getCompany = createServerFn({ method: "GET" }).handler(
  async (): Promise<CompanyInfo> => {
    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) {
      throw new Error("Missing Supabase environment credentials");
    }
    const supabase = createClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data, error } = await supabase
      .from("company_info")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (error) throw error;
    return (data as unknown as CompanyInfo | null) ?? COMPANY_FALLBACK;
  }
);
