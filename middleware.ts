import { NextResponse, type NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// Security headers, applied at the edge to every response.
//
// Why middleware and not just next.config.js headers(): a nonce has to be
// generated per-request and threaded into both the CSP header and the
// <script>/<style> tags that need it, which static config can't do. See
// app/layout.tsx for how the nonce reaches the page.
//
// This mitigates: reflected/stored XSS (CSP), clickjacking (frame-ancestors),
// MIME-sniffing attacks (X-Content-Type-Options), protocol downgrade
// (HSTS), and referrer-based PHI/PII leakage across origins (Referrer-Policy).
// It does NOT replace server-side authentication, authorization, or input
// validation -- see lib/validation.ts and the README security section.
// ---------------------------------------------------------------------------

const isDev = process.env.NODE_ENV === "development";

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = [
    `default-src 'self'`,
    // 'unsafe-eval' is required only in dev for React Fast Refresh; it must
    // never ship to production.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com`,
    `font-src 'self' https://fonts.gstatic.com`,
    `img-src 'self' data: https:`,
    // Restrict outbound fetch/XHR to our own API and explicitly allowlisted
    // inference/FHIR backends -- update as real endpoints come online.
    `connect-src 'self' https://api.biocodermd.com`,
    `frame-ancestors 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `object-src 'none'`,
    `upgrade-insecure-requests`,
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY"); // fallback for older browsers; CSP frame-ancestors is primary
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  );
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");

  if (!isDev) {
    // Only sent over HTTPS in prod -- setting this in dev breaks http://localhost.
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
  }

  return response;
}

export const config = {
  // Explicit matcher: exclude static assets and the favicon so middleware
  // (and the per-request nonce work) doesn't run on every asset fetch.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
