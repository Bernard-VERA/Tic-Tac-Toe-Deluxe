export const config = {
  matcher: "/:path*",
};

export async function middleware(request) {
  const response = await fetch(request.url);

  const newHeaders = new Headers(response.headers);

  newHeaders.set("Cache-Control", "no-store");
  newHeaders.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  newHeaders.set("X-Content-Type-Options", "nosniff");
  newHeaders.set("X-Frame-Options", "DENY");
  newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
  newHeaders.set(
    "Permissions-Policy",
    "geolocation=(), camera=(), microphone=()"
  );
  newHeaders.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self';"
  );

  return new Response(response.body, {
    status: response.status,
    headers: newHeaders,
  });
}
