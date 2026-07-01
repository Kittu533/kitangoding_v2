import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db"; // your drizzle instance
import { accounts, sessions, users, verifications } from "./db/schema";
import { resolveBetterAuthSecret } from "./auth-secret";

const authSecret = resolveBetterAuthSecret();

export const auth = betterAuth({
    secret: authSecret,
    baseURL:
        process.env.BETTER_AUTH_URL ||
        process.env.NEXT_PUBLIC_APP_URL ||
        "http://localhost:3000",
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: {
            user: users,
            session: sessions,
            account: accounts,
            verification: verifications,
        },
    }),
    emailAndPassword: {
        enabled: true,
        disableSignUp: process.env.BETTER_AUTH_DISABLE_SIGN_UP !== "false",
    },
});
