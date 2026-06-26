import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const UNAUTHORIZED_ERROR_MESSAGE = "UNAUTHORIZED_ADMIN_REQUEST";

export async function getAdminSession() {
  const requestHeaders = await headers();
  return auth.api.getSession({
    headers: requestHeaders,
  });
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    throw new Error(UNAUTHORIZED_ERROR_MESSAGE);
  }

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const sessionUser = session.user as { email?: string; role?: string } | undefined;
  const sessionEmail = sessionUser?.email?.toLowerCase();
  const sessionRole = sessionUser?.role;

  if (sessionRole !== "admin" && sessionEmail !== adminEmail) {
    throw new Error(UNAUTHORIZED_ERROR_MESSAGE);
  }

  return session;
}

export function isUnauthorizedAdminRequest(error: unknown) {
  return error instanceof Error && error.message === UNAUTHORIZED_ERROR_MESSAGE;
}
