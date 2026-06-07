import { notFound } from "next/navigation";
import { getAllContent, getContentBySlug } from "@/lib/content";
import { DiseaseTemplate } from "@/components/content/disease-template";
import { MechanismTemplate } from "@/components/content/mechanism-template";
import { GeneTemplate } from "@/components/content/gene-template";
import { InterventionTemplate } from "@/components/content/intervention-template";
import { SubpageTemplate } from "@/components/content/subpage-template";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function generateStaticParams() {
  return getAllContent().map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;
  const entry = getContentBySlug(slug);
  if (!entry) return { title: "Not found" };
  return { title: entry.title, description: entry.description };
}

export default async function ContentPage(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;
  const entry = getContentBySlug(slug);
  if (!entry) notFound();

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  let isSaved = false;
  let userDiseaseSlug: string | null = null;
  if (user) {
    const [savedResult, profileResult] = await Promise.all([
      supabase.from("saved_items").select("content_slug").eq("user_id", user.id).eq("content_slug", slug).maybeSingle(),
      supabase.from("profiles").select("disease").eq("id", user.id).maybeSingle(),
    ]);
    isSaved = !!savedResult.data;
    userDiseaseSlug = profileResult.data?.disease ?? null;
  }

  const mod = await import(`@/content/${entry.type}/${entry.slug}.mdx`);
  const MDX = mod.default;

  const props_ = { entry, isSaved, isAuthed: !!user, userDiseaseSlug };

  switch (entry.type) {
    case "diseases":
      return <DiseaseTemplate {...props_}><MDX /></DiseaseTemplate>;
    case "mechanisms":
      return <MechanismTemplate {...props_}><MDX /></MechanismTemplate>;
    case "genes":
      return <GeneTemplate {...props_}><MDX /></GeneTemplate>;
    case "interventions":
      return <InterventionTemplate {...props_}><MDX /></InterventionTemplate>;
    case "individual-genes":
    case "individual-interventions":
    case "individual-supplements":
    case "individual-lifestyle":
      return <SubpageTemplate {...props_}><MDX /></SubpageTemplate>;
  }
}
