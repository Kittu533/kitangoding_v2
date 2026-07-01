function isLoopbackHost(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}

export function resolveAuthClientBasePath() {
  return "/api/auth";
}

export function getTrustedAuthOrigins(baseURL?: string) {
  if (!baseURL) {
    return [];
  }

  const origin = new URL(baseURL).origin;
  const hostname = new URL(baseURL).hostname;

  if (isLoopbackHost(hostname)) {
    return [origin];
  }

  if (hostname.startsWith("www.")) {
    return [origin, new URL(baseURL).origin.replace("://www.", "://")];
  }

  return [origin, origin.replace("://", "://www.")];
}
