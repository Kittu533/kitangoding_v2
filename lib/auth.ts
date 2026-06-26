import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db"; // your drizzle instance
import { accounts, sessions, users, verifications } from "./db/schema";

const PLACEHOLDER_SECRET = "generate-a-random-secret-key-here";
const authSecret = process.env.BETTER_AUTH_SECRET;
const isProductionRuntime =
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PHASE !== "phase-production-build";

if (isProductionRuntime && (!authSecret || authSecret === PLACEHOLDER_SECRET)) {
    throw new Error(
        "BETTER_AUTH_SECRET must be set to a real random value in production runtime."
    );
}

export const auth = betterAuth({
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
