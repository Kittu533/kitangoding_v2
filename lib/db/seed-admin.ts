import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!connectionString) {
  console.error("❌ ERROR: DATABASE_URL tidak ditemukan.");
  process.exit(1);
}

if (!adminEmail || !adminPassword) {
  console.error("❌ ERROR: ADMIN_EMAIL dan ADMIN_PASSWORD wajib diisi.");
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });

async function createAdmin() {
  console.log("🔐 Mempersiapkan Admin Account...");
  try {
      process.env.BETTER_AUTH_DISABLE_SIGN_UP = "false";
      const { auth } = await import("../auth");

      const existingUser = await db.select().from(schema.users).where(
         eq(schema.users.email, adminEmail!)
      );

      if (existingUser.length > 0) {
          await db.update(schema.users).set({ role: "admin" }).where(eq(schema.users.email, adminEmail!));
          console.log("Admin account already exists!");
          process.exit(0);
      }

      console.log(`Mendaftarkan email admin: ${adminEmail} ...`);

      await auth.api.signUpEmail({
        body: {
          email: adminEmail!,
          password: adminPassword!,
          name: "Super Admin",
        }
      });

      await db.update(schema.users).set({ role: "admin" }).where(eq(schema.users.email, adminEmail!));

      console.log("✅ Admin berhasil dibuat!");
      console.log(`👉 Email: ${adminEmail}`);

  } catch (err) {
      console.error("❌ Gagal membuat admin:", err);
  }
  process.exit(0);
}

createAdmin();
