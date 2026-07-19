import assert from "node:assert/strict";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local", quiet: true });
dotenv.config({ path: ".env", quiet: true });

async function main() {
  const [{ db }, { blogPosts }, { desc, eq }, { getPublicBlogCategories, getPublicBlogPosts }] = await Promise.all([
    import("../lib/db"),
    import("../lib/db/schema"),
    import("drizzle-orm"),
    import("../lib/public-content"),
  ]);

  const [dashboardPosts, publicPosts, publicCategories] = await Promise.all([
    db
      .select({ slug: blogPosts.slug, category: blogPosts.category })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt), desc(blogPosts.createdAt)),
    getPublicBlogPosts(),
    getPublicBlogCategories(),
  ]);

  assert.deepEqual(publicPosts.map((post) => post.slug), dashboardPosts.map((post) => post.slug));
  for (const post of dashboardPosts) {
    assert.ok(publicCategories.some((category) => category.label === post.category));
  }

  console.log("blog dashboard data smoke test: PASS");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
