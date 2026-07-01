import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { CompanyInfo } from "@/lib/site-content";
import { ImageUploader } from "@/components/admin/ImageUploader";

export const Route = createFileRoute("/_authenticated/admin/company")({
  component: AdminCompanyPage,
});

function AdminCompanyPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-company"],
    queryFn: async () => {
      const { data, error } = await supabase.from("company_info").select("*").eq("id", 1).maybeSingle();
      if (error) throw error;
      return data as unknown as CompanyInfo | null;
    },
  });

  const [form, setForm] = useState<CompanyInfo | null>(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (data) setForm(data); }, [data]);

  if (isLoading || !form) return <p className="text-zinc-500">Loading…</p>;

  function set<K extends keyof CompanyInfo>(k: K, v: CompanyInfo[K]) {
    setForm((f) => f ? { ...f, [k]: v } : f);
  }

  async function save() {
    if (!form) return;
    setSaving(true);
    try {
      const { error } = await supabase.from("company_info").update({
        name: form.name, tagline: form.tagline, phone: form.phone, email: form.email,
        address: form.address, stats: form.stats, about_text: form.about_text,
        logo_url: form.logo_url, name_segments: form.name_segments ?? [],
        owner_name: form.owner_name ?? "", owner_title: form.owner_title ?? "",
        owner_bio: form.owner_bio ?? "", owner_image_url: form.owner_image_url ?? "",
      }).eq("id", 1);
      if (error) throw error;
      toast.success("Company info saved");
      qc.invalidateQueries({ queryKey: ["company"] });
      qc.invalidateQueries({ queryKey: ["admin-company"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function updateStat(i: number, key: "value" | "label", val: string) {
    const stats = [...form!.stats];
    stats[i] = { ...stats[i], [key]: val };
    set("stats", stats);
  }
  function addStat() { set("stats", [...form!.stats, { value: "", label: "" }]); }
  function removeStat(i: number) { set("stats", form!.stats.filter((_, idx) => idx !== i)); }

  const inputCls = "w-full rounded-lg bg-white px-3 py-2 ring-1 ring-black/10 text-sm outline-none focus:ring-2 focus:ring-brand";
  const labelCls = "text-[11px] font-medium uppercase tracking-wider text-zinc-500";

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="text-xl font-semibold">Company Info</h2>

      <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5 space-y-4">
        <div>
          <label className={labelCls}>Company logo</label>
          <div className="mt-1"><ImageUploader value={form.logo_url ?? ""} onChange={(v) => set("logo_url", v)} folder="misc" /></div>
        </div>
        <div><label className={labelCls}>Company name</label><input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} /></div>

        <div className="rounded-lg bg-zinc-50 p-3 ring-1 ring-black/5">
          <div className="flex items-center justify-between">
            <label className={labelCls}>Name colors (optional)</label>
            <button
              type="button"
              onClick={() => set("name_segments", [...(form.name_segments ?? []), { text: "", color: "#0066ff" }])}
              className="inline-flex items-center gap-1 text-xs text-brand hover:underline"
            ><Plus className="size-3.5" /> Add segment</button>
          </div>
          <p className="mt-1 text-xs text-zinc-500">Split the name into pieces and pick a color for each. Leave empty to show the plain name above.</p>
          <div className="mt-2 space-y-2">
            {(form.name_segments ?? []).map((seg, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  className={`${inputCls} flex-1`}
                  placeholder="e.g. R"
                  value={seg.text}
                  onChange={(e) => {
                    const segs = [...(form.name_segments ?? [])];
                    segs[i] = { ...segs[i], text: e.target.value };
                    set("name_segments", segs);
                  }}
                />
                <input
                  type="color"
                  className="h-9 w-12 rounded ring-1 ring-black/10 cursor-pointer bg-white"
                  value={seg.color || "#000000"}
                  onChange={(e) => {
                    const segs = [...(form.name_segments ?? [])];
                    segs[i] = { ...segs[i], color: e.target.value };
                    set("name_segments", segs);
                  }}
                />
                <button
                  type="button"
                  onClick={() => set("name_segments", (form.name_segments ?? []).filter((_, idx) => idx !== i))}
                  className="px-2 text-red-600"
                ><Trash2 className="size-4" /></button>
              </div>
            ))}
            {(form.name_segments ?? []).length > 0 && (
              <div className="pt-1 text-sm">
                Preview:{" "}
                <span className="font-semibold tracking-tight">
                  {form.name_segments.map((s, i) => (
                    <span key={i} style={{ color: s.color || undefined }}>{s.text}</span>
                  ))}
                </span>
              </div>
            )}
          </div>
        </div>
        <div><label className={labelCls}>Tagline / headline</label><input className={inputCls} value={form.tagline} onChange={(e) => set("tagline", e.target.value)} /></div>
        <div><label className={labelCls}>About text</label><textarea rows={4} className={inputCls} value={form.about_text} onChange={(e) => set("about_text", e.target.value)} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelCls}>Phone</label><input className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} /></div>
          <div><label className={labelCls}>Email</label><input className={inputCls} value={form.email} onChange={(e) => set("email", e.target.value)} /></div>
        </div>
        <div><label className={labelCls}>Address</label><input className={inputCls} value={form.address} onChange={(e) => set("address", e.target.value)} /></div>
      </div>

      <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Stats (shown on home & about pages)</h3>
          <button onClick={addStat} className="inline-flex items-center gap-1 text-sm text-brand hover:underline"><Plus className="size-4" /> Add</button>
        </div>
        <div className="space-y-2">
          {form.stats.map((s, i) => (
            <div key={i} className="flex gap-2">
              <input className={`${inputCls} w-28`} placeholder="25+" value={s.value} onChange={(e) => updateStat(i, "value", e.target.value)} />
              <input className={inputCls} placeholder="Years Experience" value={s.label} onChange={(e) => updateStat(i, "label", e.target.value)} />
              <button onClick={() => removeStat(i)} className="px-2 text-red-600"><Trash2 className="size-4" /></button>
            </div>
          ))}
          {form.stats.length === 0 && <p className="text-xs text-zinc-500">No stats. Add up to 3.</p>}
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={save} disabled={saving} className="rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-white hover:brightness-110 disabled:opacity-60">
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
