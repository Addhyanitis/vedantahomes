import { supabase } from "@/integrations/supabase/client";

export type AppointmentInput = {
  full_name: string;
  phone: string;
  email?: string | null;
  plot_interest: string;
  preferred_date: string; // YYYY-MM-DD
  message?: string | null;
};

export async function submitAppointment(input: AppointmentInput) {
  const { error } = await supabase.from("appointments").insert({
    full_name: input.full_name.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() || null,
    plot_interest: input.plot_interest.trim(),
    preferred_date: input.preferred_date,
    message: input.message?.trim() || null,
  });
  if (error) throw new Error(error.message);
}
