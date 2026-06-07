"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function toggleSave(slug: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sign in to save items." };

  const { data: existing } = await supabase
    .from("saved_items")
    .select("content_slug")
    .eq("user_id", user.id)
    .eq("content_slug", slug)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("saved_items")
      .delete()
      .eq("user_id", user.id)
      .eq("content_slug", slug);
    revalidatePath("/", "layout");
    return { saved: false };
  }

  await supabase.from("saved_items").insert({ user_id: user.id, content_slug: slug });
  revalidatePath("/", "layout");
  return { saved: true };
}
