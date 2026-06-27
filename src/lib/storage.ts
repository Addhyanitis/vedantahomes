import { supabase } from "@/integrations/supabase/client";

const BUCKET = "site-media";
// 10 years - URL effectively permanent for display purposes.
const SIGNED_EXPIRY_SECONDS = 60 * 60 * 24 * 365 * 10;

export async function uploadSiteImage(file: File, folder: "plots" | "projects" | "misc") {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  const { data, error: signErr } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, SIGNED_EXPIRY_SECONDS);
  if (signErr || !data) throw signErr ?? new Error("Failed to sign URL");
  return data.signedUrl;
}
