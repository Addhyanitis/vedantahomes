import { useState } from "react";
import { toast } from "sonner";
import { submitAppointment } from "@/lib/appointments";
import { PLOTS } from "@/lib/site-data";

export function BookingForm({
  defaultPlot,
  compact = false,
}: {
  defaultPlot?: string;
  compact?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setLoading(true);
    try {
      await submitAppointment({
        full_name: String(data.get("full_name") || ""),
        phone: String(data.get("phone") || ""),
        email: String(data.get("email") || "") || null,
        plot_interest: String(data.get("plot_interest") || ""),
        preferred_date: String(data.get("preferred_date") || ""),
        message: String(data.get("message") || "") || null,
      });
      toast.success("Booking received — our team will call you within 24 hours.");
      setDone(true);
      form.reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full rounded-lg bg-surface px-4 py-2.5 ring-1 ring-black/5 text-sm outline-none focus:ring-2 focus:ring-brand transition";
  const labelCls =
    "text-[11px] font-medium uppercase tracking-wider text-zinc-500";

  if (done) {
    return (
      <div className="rounded-2xl bg-white p-8 ring-1 ring-black/5 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand text-xl font-bold">
          ✓
        </div>
        <h3 className="mt-4 text-lg font-semibold text-zinc-900">Booking confirmed</h3>
        <p className="mt-2 text-sm text-zinc-500 text-pretty">
          Thanks! A site coordinator will reach out shortly to confirm your visit
          window and share directions.
        </p>
        <button
          onClick={() => setDone(false)}
          className="mt-6 text-sm font-medium text-brand hover:underline"
        >
          Book another visit
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`rounded-2xl bg-white ring-1 ring-black/5 ${compact ? "p-6" : "p-8"}`}
    >
      {!compact && (
        <h3 className="text-xl font-semibold mb-1">Book a Site Visit</h3>
      )}
      {!compact && (
        <p className="text-sm text-zinc-500 mb-6">
          Walk the land with a coordinator. Free, no obligation.
        </p>
      )}

      <div className="space-y-4">
        <div className="space-y-1">
          <label className={labelCls}>Full Name</label>
          <input name="full_name" required minLength={2} className={inputCls} placeholder="Your full name" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className={labelCls}>Phone</label>
            <input name="phone" type="tel" required className={inputCls} placeholder="+91 98765 43210" />
          </div>
          <div className="space-y-1">
            <label className={labelCls}>Email (optional)</label>
            <input name="email" type="email" className={inputCls} placeholder="you@example.com" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className={labelCls}>Plot of Interest</label>
            <select
              name="plot_interest"
              required
              defaultValue={defaultPlot ?? PLOTS[0].slug}
              className={inputCls}
            >
              {PLOTS.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
              <option value="general">Not sure yet — recommend something</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className={labelCls}>Preferred Date</label>
            <input
              name="preferred_date"
              type="date"
              required
              min={new Date().toISOString().slice(0, 10)}
              className={inputCls}
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className={labelCls}>Message (optional)</label>
          <textarea
            name="message"
            rows={3}
            className={inputCls}
            placeholder="Anything specific you'd like us to prepare?"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-brand py-3 text-sm font-semibold text-white ring-1 ring-brand transition hover:brightness-110 disabled:opacity-60"
        >
          {loading ? "Booking…" : "Confirm Site Visit"}
        </button>
        <p className="text-[11px] text-center text-zinc-400">
          By submitting you agree to be contacted by our team about this enquiry.
        </p>
      </div>
    </form>
  );
}
