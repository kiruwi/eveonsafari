import { NextRequest, NextResponse } from "next/server";

const canonicalHost = (() => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return null;
  try {
    return new URL(raw).hostname;
  } catch {
    return null;
  }
})();

export function proxy(request: NextRequest) {
  if (!canonicalHost) return NextResponse.next();

  const hostname = request.nextUrl.hostname;
  const apexHost = canonicalHost.startsWith("www.")
    ? canonicalHost.slice(4)
    : canonicalHost;
  const wwwHost = `www.${apexHost}`;

  if (hostname !== canonicalHost && (hostname === apexHost || hostname === wwwHost)) {
    const url = request.nextUrl.clone();
    url.hostname = canonicalHost;
    url.protocol = "https";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)"],
};
