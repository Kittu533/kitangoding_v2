import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL not found");
  process.exit(1);
}

const sql = postgres(connectionString);

async function main() {
  try {
    // Drop the tables so drizzle-kit can recreate them without ambiguity
    await sql`DROP TABLE IF EXISTS "portfolios" CASCADE;`;
    await sql`DROP TABLE IF EXISTS "portfolio_categories" CASCADE;`;
    await sql`DROP TABLE IF EXISTS "services" CASCADE;`;
    await sql`DROP TABLE IF EXISTS "testimonials" CASCADE;`;
    await sql`DROP TABLE IF EXISTS "blog_posts" CASCADE;`;
    await sql`DROP TABLE IF EXISTS "pricings" CASCADE;`;
    console.log("Tables dropped successfully");
  } catch (error) {
    console.error("Error dropping tables:", error);
  } finally {
    await sql.end();
  }
}

main();