import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Random Developers" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Account created. You're signed in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back.");
      }
      navigate({ to: "/admin/plots" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Auth failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <section className="bg-surface py-20 min-h-[70vh]">
        <div className="container-page max-w-md">
          <div className="rounded-2xl bg-white p-8 ring-1 ring-black/5">
            <h1 className="text-2xl font-semibold text-zinc-900">
              {mode === "signin" ? "Admin sign in" : "Create admin account"}
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              {mode === "signin"
                ? "Sign in to edit plots, projects and company info."
                : "The first account becomes admin automatically. Others need to be promoted."}
            </p>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-lg bg-surface px-4 py-2.5 ring-1 ring-black/5 text-sm outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  className="mt-1 w-full rounded-lg bg-surface px-4 py-2.5 ring-1 ring-black/5 text-sm outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-brand py-3 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
              >
                {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
              </button>
            </form>
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="mt-4 text-sm text-brand hover:underline"
            >
              {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
            </button>
            <div className="mt-6 text-center">
              <Link to="/" className="text-xs text-zinc-500 hover:text-brand">← Back to site</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
