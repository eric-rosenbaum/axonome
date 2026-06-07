import { NextResponse, type NextRequest } from "next/server";
import { updateSupabaseSession } from "@/lib/supabase/proxy-helpers";

const AUTH_GATED_PREFIXES = ["/dashboard", "/account", "/onboarding", "/saved"];
const PUBLIC_ONLY_PREFIXES = ["/login", "/signup"];

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSupabaseSession(request);
  const { pathname } = request.nextUrl;

  const isGated = AUTH_GATED_PREFIXES.some((p) => pathname.startsWith(p));
  const isPublicOnly = PUBLIC_ONLY_PREFIXES.some((p) => pathname.startsWith(p));

  if (isGated && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isPublicOnly && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|woff2?|ttf)$).*)",
  ],
};
