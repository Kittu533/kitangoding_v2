import { expect, test } from "@playwright/test";

const maxPageLoadMs = Number(process.env.MAX_PAGE_LOAD_MS ?? 5_000);
const publicPages = ["/", "/layanan", "/portfolio", "/pricing", "/blog", "/tentang", "/contact"];
type SpeedResult = {
  test: string;
  halaman: string;
  domContentLoaded: number | "-";
  load: number;
  status: "LULUS" | "GAGAL";
};

test("menu utama berpindah antarhalaman dengan cepat", async ({ page }, testInfo) => {
  const results: SpeedResult[] = [];
  await page.goto("/");

  for (const [label, path] of [
    ["Layanan", "/layanan"],
    ["Portfolio", "/portfolio"],
    ["Harga", "/pricing"],
    ["Blog", "/blog"],
    ["Tentang", "/tentang"],
    ["Kontak", "/contact"],
  ] as const) {
    const startedAt = Date.now();
    await page.locator("header nav").getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.locator("main")).toBeVisible();

    const duration = Date.now() - startedAt;
    results.push({
      test: "Klik menu",
      halaman: label,
      domContentLoaded: "-",
      load: duration,
      status: duration < maxPageLoadMs ? "LULUS" : "GAGAL",
    });
    expect.soft(duration, `${label} melebihi batas ${maxPageLoadMs}ms`).toBeLessThan(maxPageLoadMs);
  }

  await testInfo.attach("page-speed", { body: JSON.stringify(results), contentType: "application/json" });
});

test("kartu portfolio membuka detail dan bisa kembali", async ({ page }, testInfo) => {
  await page.goto("/portfolio");
  const projectCard = page.locator('main a[href^="/portfolio/"]').first();

  await expect(projectCard).toBeVisible();
  await expect(projectCard.locator("img")).toHaveJSProperty("complete", true);
  await expect(projectCard.locator("img")).not.toHaveJSProperty("naturalWidth", 0);
  const startedAt = Date.now();
  await projectCard.click();
  await expect(page).toHaveURL(/\/portfolio\/[^/]+$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const detailImage = page.getByAltText(/^Tampilan proyek/);
  await expect(detailImage).toHaveJSProperty("complete", true);
  await expect(detailImage).not.toHaveJSProperty("naturalWidth", 0);

  const duration = Date.now() - startedAt;
  const result: SpeedResult = {
    test: "Klik konten",
    halaman: "Portfolio → detail",
    domContentLoaded: "-",
    load: duration,
    status: duration < maxPageLoadMs ? "LULUS" : "GAGAL",
  };
  await testInfo.attach("page-speed", { body: JSON.stringify([result]), contentType: "application/json" });
  expect.soft(duration, `Detail portfolio melebihi batas ${maxPageLoadMs}ms`).toBeLessThan(maxPageLoadMs);

  await page.getByRole("link", { name: "Kembali ke portfolio" }).click();
  await expect(page).toHaveURL(/\/portfolio$/);
});

for (const path of publicPages) {
  test(`${path} selesai dimuat di bawah ${maxPageLoadMs}ms`, async ({ page }, testInfo) => {
    const response = await page.goto(path, { waitUntil: "load" });
    expect(response?.ok()).toBeTruthy();

    const timing = await page.evaluate(() => {
      const [navigation] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];

      return {
        domContentLoaded: Math.round(navigation.domContentLoadedEventEnd),
        load: Math.round(navigation.duration),
      };
    });

    const result: SpeedResult = {
      test: "Muat halaman",
      halaman: path,
      domContentLoaded: timing.domContentLoaded,
      load: timing.load,
      status: response?.ok() && timing.load > 0 && timing.load < maxPageLoadMs ? "LULUS" : "GAGAL",
    };
    await testInfo.attach("page-speed", { body: JSON.stringify([result]), contentType: "application/json" });
    expect(timing.load).toBeGreaterThan(0);
    expect(timing.load).toBeLessThan(maxPageLoadMs);
  });
}
