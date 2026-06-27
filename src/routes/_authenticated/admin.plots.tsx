import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { TAG_OPTIONS, type Plot } from "@/lib/site-content";
import { ImageUploader } from "@/components/admin/ImageUploader";

export const Route = createFileRoute("/_authenticated/admin/plots")({
  component: AdminPlotsPage,
});

const empty: Omit<Plot, "id"> = {
  slug: "",
  name: "",
  location: "",
  area: "",
  facing: "",
  price: "",
  tag: "AVAILABLE",
  image_url: "",
  description: "",
  sort_order: 0,
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function AdminPlotsPage() {
  const qc = useQueryClient();
  const { data: plots = [], isLoading } = useQuery({
    queryKey: ["admin-plots"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plots")
        .select("*")
        .order("sort_order")
        .order("created_at");
      if (error) throw error;
      return data as Plot[];
    },
  });

  const [editing, setEditing] = useState<Plot | null>(null);
  const [creating, setCreating] = useState(false);

  function refresh() {
    qc.invalidateQueries({ queryKey: ["admin-plots"] });
    qc.invalidateQueries({ queryKey: ["plots"] });
  }

  async function remove(id: string) {
    if (!confirm("Delete this plot? This cannot be undone.")) return;
    const { error } = await supabase.from("plots").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Plot deleted");
    refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Plots & Lands ({plots.length})</h2>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:brightness-110"
        >
          <Plus className="size-4" /> Add plot
        </button>
      </div>

      {isLoading ? (
        <p className="text-zinc-500">Loading…</p>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wider text-zinc-500">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Tag</th>
                <th className="px-4 py-3 w-24">Order</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {plots.map((p) => (
                <tr key={p.id} className="border-t border-black/5">
                  <td className="px-4 py-3">
                    <div className="h-12 w-16 overflow-hidden rounded bg-zinc-100">
                      {p.image_url && <img src={p.image_url} alt="" className="h-full w-full object-cover" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-zinc-500">{p.location}</td>
                  <td className="px-4 py-3">{p.price}</td>
                  <td className="px-4 py-3 text-xs">{p.tag}</td>
                  <td className="px-4 py-3 text-zinc-500">{p.sort_order}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditing(p)} className="inline-flex items-center gap-1 text-brand hover:underline text-xs">
                      <Pencil className="size-3" /> Edit
                    </button>
                    <button onClick={() => remove(p.id)} className="ml-3 inline-flex items-center gap-1 text-red-600 hover:underline text-xs">
                      <Trash2 className="size-3" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {plots.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-zinc-500">No plots yet. Click "Add plot".</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {(editing || creating) && (
        <PlotEditor
          initial={editing ?? { id: "", ...empty }}
          isNew={creating}
          onClose={() => { setEditing(null); setCreating(false); }}
          onSaved={refresh}
        />
      )}
    </div>
  );
}

function PlotEditor({
  initial,
  isNew,
  onClose,
  onSaved,
}: {
  initial: Plot;
  isNew: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Plot>(initial);
  const [saving, setSaving] = useState(false);

  useEffect(() => setForm(initial), [initial]);

  function set<K extends keyof Plot>(k: K, v: Plot[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function save() {
    if (!form.name.trim()) return toast.error("Name is required");
    const slug = form.slug.trim() || slugify(form.name);
    setSaving(true);
    try {
      if (isNew) {
        const { error } = await supabase.from("plots").insert({
          slug, name: form.name, location: form.location, area: form.area, facing: form.facing,
          price: form.price, tag: form.tag, image_url: form.image_url, description: form.description,
          sort_order: form.sort_order,
        });
        if (error) throw error;
        toast.success("Plot added");
      } else {
        const { error } = await supabase.from("plots").update({
          slug, name: form.name, location: form.location, area: form.area, facing: form.facing,
          price: form.price, tag: form.tag, image_url: form.image_url, description: form.description,
          sort_order: form.sort_order,
        }).eq("id", form.id);
        if (error) throw error;
        toast.success("Saved");
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const inputCls = "w-full rounded-lg bg-white px-3 py-2 ring-1 ring-black/10 text-sm outline-none focus:ring-2 focus:ring-brand";
  const labelCls = "text-[11px] font-medium uppercase tracking-wider text-zinc-500";

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 my-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{isNew ? "Add plot" : "Edit plot"}</h3>
          <button onClick={onClose}><X className="size-5" /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Image</label>
            <div className="mt-1"><ImageUploader value={form.image_url} onChange={(u) => set("image_url", u)} folder="plots" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelCls}>Name</label><input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} /></div>
            <div><label className={labelCls}>Slug (URL)</label><input className={inputCls} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto from name" /></div>
          </div>
          <div><label className={labelCls}>Location</label><input className={inputCls} value={form.location} onChange={(e) => set("location", e.target.value)} /></div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className={labelCls}>Area</label><input className={inputCls} value={form.area} onChange={(e) => set("area", e.target.value)} /></div>
            <div><label className={labelCls}>Facing</label><input className={inputCls} value={form.facing} onChange={(e) => set("facing", e.target.value)} /></div>
            <div><label className={labelCls}>Price</label><input className={inputCls} value={form.price} onChange={(e) => set("price", e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Tag</label>
              <select className={inputCls} value={form.tag} onChange={(e) => set("tag", e.target.value)}>
                {TAG_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div><label className={labelCls}>Display order</label><input type="number" className={inputCls} value={form.sort_order} onChange={(e) => set("sort_order", Number(e.target.value) || 0)} /></div>
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea rows={4} className={inputCls} value={form.description} onChange={(e) => set("description", e.target.value)} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={onClose} className="rounded-md px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100">Cancel</button>
            <button onClick={save} disabled={saving} className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:brightness-110 disabled:opacity-60">
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
