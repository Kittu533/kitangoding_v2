import { createAuthClient } from "better-auth/react";
import { resolveAuthClientBasePath } from "./auth-url";

export const authClient = createAuthClient({
  basePath: resolveAuthClientBasePath(),
});
