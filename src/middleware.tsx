import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const getValidSubdomain = (host?: string | null) => {
  let subdomain: string | null = null;
  if (!host && typeof window !== 'undefined') {
    // On client side, get the host from window
    host = window.location.host;
  }
  if (host && host.includes('.')) {
    const candidate = host.split('.')[0];
    if (candidate && !candidate.includes('localhost')) {
      // Valid candidate
      subdomain = candidate;
    }
  }
  return subdomain;
};

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host');
  const subdomain = getValidSubdomain(host);

  if (subdomain == "dash") {
    // Subdomain available, rewriting
    console.log(`>>> Rewriting: ${url.pathname} to /${subdomain}${url.pathname}`);
    url.pathname = `/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  } else {
    const headers = new Headers(request.headers);
    headers.set("X-Current-Path", request.nextUrl.pathname);
    return NextResponse.next({ headers });
  }
}

export const config = {
  // This matcher excludes common static or API routes.
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};