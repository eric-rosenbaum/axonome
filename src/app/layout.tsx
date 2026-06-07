import type { Metadata } from "next";
import { Inter, Instrument_Sans } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const instrument = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Axonome", template: "%s · Axonome" },
  description: "Explore Alzheimer's, Parkinson's, and other neurodegenerative diseases with Axonome, your resource for insights and updates.",
  openGraph: {
    title: "Axonome",
    description: "Explore Alzheimer's, Parkinson's, and other neurodegenerative diseases with Axonome, your resource for insights and updates.",
    url: "https://www.axonome.org",
    siteName: "Axonome",
    type: "website",
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  let profile: { name: string | null; disease: string | null } | null = null;
  if (user) {
    const { data: p } = await supabase
      .from("profiles")
      .select("name, disease")
      .eq("id", user.id)
      .maybeSingle();
    profile = p ?? null;
  }

  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable} h-full`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SiteHeader isAuthed={!!user} userName={profile?.name ?? null} diseaseSlug={profile?.disease ?? null} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
