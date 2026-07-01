const PLACEHOLDER_SECRET = "generate-a-random-secret-key-here";
const BUILD_SECRET = "build-only-secret-placeholder-1234567890";

type AuthSecretEnv = {
  BETTER_AUTH_SECRET?: string;
  NEXT_PHASE?: string;
  NODE_ENV?: string;
};

export function resolveBetterAuthSecret(env: AuthSecretEnv = process.env) {
  const authSecret = env.BETTER_AUTH_SECRET;
  const isBuildPhase = env.NEXT_PHASE === "phase-production-build";
  const isProductionRuntime = env.NODE_ENV === "production" && !isBuildPhase;

  if (isBuildPhase && (!authSecret || authSecret === PLACEHOLDER_SECRET)) {
    return BUILD_SECRET;
  }

  if (isProductionRuntime && (!authSecret || authSecret === PLACEHOLDER_SECRET)) {
    throw new Error(
      "BETTER_AUTH_SECRET must be set to a real random value in production runtime."
    );
  }

  return authSecret;
}
