import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL not found");
  process.exit(1);
}

const sql = postgres(connectionString);

async function main() {
  try {
    await sql`DROP TABLE IF EXISTS "users" CASCADE;`;
    await sql`DROP TABLE IF EXISTS "sessions" CASCADE;`;
    await sql`DROP TABLE IF EXISTS "accounts" CASCADE;`;
    await sql`DROP TABLE IF EXISTS "verifications" CASCADE;`;
    await sql`DROP TABLE IF EXISTS "leads" CASCADE;`;
    console.log("Auth tables dropped successfully");
  } catch (error) {
    console.error("Error dropping tables:", error);
  } finally {
    await sql.end();
  }
}

main();