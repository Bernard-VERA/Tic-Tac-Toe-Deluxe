export const config = {
  matcher: "/:path*",
};

export async function middleware(request) {
  // Récupère la vraie réponse (HTML, JS, CSS…)
  const originalResponse = await fetch(request);

  // Copie les headers existants
  const newHeaders = new Headers(originalResponse.headers);

  // Désactive le cache CDN pour forcer l’exécution du middleware
  newHeaders.set("Cache-Control", "no-store");

  // Ajoute tes headers de sécurité
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

  // Renvoie la réponse originale avec les nouveaux headers
  return new Response(originalResponse.body, {
    status: originalResponse.status,
    headers: newHeaders,
  });
}
