import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, ShieldOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/users")({
  component: AdminUsersPage,
});

type Row = { user_id: string; role: string; created_at: string };

function AdminUsersPage() {
  const qc = useQueryClient();
  const { data: roles = [], isLoading } = useQuery({
    queryKey: ["admin-roles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("user_id, role, created_at")
        .order("created_at");
      if (error) throw error;
      return data as Row[];
    },
  });

  const [grantId, setGrantId] = useState("");
  const [busy, setBusy] = useState(false);

  async function grant() {
    if (!grantId.trim()) return toast.error("Paste a user ID");
    setBusy(true);
    try {
      const { error } = await supabase.from("user_roles").insert({ user_id: grantId.trim(), role: "admin" });
      if (error) throw error;
      toast.success("Admin role granted");
      setGrantId("");
      qc.invalidateQueries({ queryKey: ["admin-roles"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function revoke(userId: string) {
    if (!confirm("Revoke admin from this user?")) return;
    const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "admin");
    if (error) return toast.error(error.message);
    toast.success("Revoked");
    qc.invalidateQueries({ queryKey: ["admin-roles"] });
  }

  const admins = roles.filter((r) => r.role === "admin");

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="text-xl font-semibold">Admins</h2>

      <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
        <h3 className="font-semibold mb-2">Grant admin to another user</h3>
        <p className="text-xs text-zinc-500 mb-3">
          Ask the person to sign up at <code>/auth</code> first. Then ask them for their user ID
          (they can find it in their browser's localStorage under <code>sb-…-auth-token</code>),
          or look it up in your backend. Paste it below.
        </p>
        <div className="flex gap-2">
          <input
            value={grantId}
            onChange={(e) => setGrantId(e.target.value)}
            placeholder="user-uuid-here"
            className="flex-1 rounded-lg bg-white px-3 py-2 ring-1 ring-black/10 text-sm outline-none focus:ring-2 focus:ring-brand"
          />
          <button onClick={grant} disabled={busy} className="inline-flex items-center gap-1 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:brightness-110 disabled:opacity-60">
            <ShieldCheck className="size-4" /> Grant admin
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white ring-1 ring-black/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-black/5"><h3 className="font-semibold">Current admins ({admins.length})</h3></div>
        {isLoading ? <p className="p-6 text-zinc-500">Loading…</p> : (
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wider text-zinc-500">
              <tr><th className="px-6 py-3">User ID</th><th className="px-6 py-3">Granted</th><th className="px-6 py-3"></th></tr>
            </thead>
            <tbody>
              {admins.map((r) => (
                <tr key={r.user_id} className="border-t border-black/5">
                  <td className="px-6 py-3 font-mono text-xs">{r.user_id}</td>
                  <td className="px-6 py-3 text-zinc-500">{new Date(r.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-3 text-right">
                    <button onClick={() => revoke(r.user_id)} className="inline-flex items-center gap-1 text-red-600 hover:underline text-xs">
                      <ShieldOff className="size-3" /> Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
