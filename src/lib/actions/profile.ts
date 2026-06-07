"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DISEASES } from "@/lib/diseases";

const DISEASE_SLUGS = new Set(DISEASES.map((d) => d.slug as string));
const VALID_ROLES = new Set(["patient", "loved-one", "exploring"]);

export async function completeOnboarding(formData: FormData) {
  const role = String(formData.get("role") ?? "");
  const disease = String(formData.get("disease") ?? "");
  const name = String(formData.get("name") ?? "").trim() || null;

  if (!VALID_ROLES.has(role)) {
    return { error: "Please tell us who you are." };
  }
  if (role !== "exploring" && !DISEASE_SLUGS.has(disease)) {
    return { error: "Please select a disease." };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("profiles")
    .update({
      role,
      disease: role === "exploring" ? null : disease,
      name,
      onboarded_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  redirect("/");
}

export async function updateProfile(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const name = String(formData.get("name") ?? "").trim() || null;
  const role = String(formData.get("role") ?? "");
  const disease = String(formData.get("disease") ?? "");

  if (!VALID_ROLES.has(role)) return { error: "Invalid role." };
  if (role !== "exploring" && !DISEASE_SLUGS.has(disease)) {
    return { error: "Please select a disease." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      name,
      role,
      disease: role === "exploring" ? null : disease,
    })
    .eq("id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  return { ok: true };
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function deleteAccount() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.rpc("delete_account");
  if (error) return { error: error.message };

  await supabase.auth.signOut();
  redirect("/");
}
