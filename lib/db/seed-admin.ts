import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import * as schema from "./schema";
import { auth } from "../auth";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ ERROR: DATABASE_URL tidak ditemukan.");
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });

async function createAdmin() {
  console.log("🔐 Mempersiapkan Admin Account...");
  try {
      // Because we use better-auth, we should ideally use its API to create a user to ensure
      // proper hashing, but since we are in a backend script without a running server,
      // we'll hit the API indirectly or we can just construct a fetch request to the signup endpoint if needed.
      // Actually, Better Auth allows backend admin creation using the auth object:
      
      const email = "admin@kitangoding.local";
      const password = "adminpassword123";

      const existingUser = await db.select().from(schema.users).where(
         eq(schema.users.email, email)
      );

      if (existingUser.length > 0) {
          console.log("Admin account already exists!");
          process.exit(0);
      }

      console.log(`Mendaftarkan email: ${email} ...`);

      // Better Auth exports an API that we can use server-side
      await auth.api.signUpEmail({
        body: {
          email: email,
          password: password,
          name: "Super Admin",
        }
      });

      console.log("✅ Admin berhasil dibuat!");
      console.log(`👉 Email: ${email}`);
      console.log(`👉 Password: ${password}`);

  } catch (err) {
      console.error("❌ Gagal membuat admin:", err);
  }
  process.exit(0);
}

createAdmin();
