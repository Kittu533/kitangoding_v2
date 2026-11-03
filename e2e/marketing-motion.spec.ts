import { expect, test } from "@playwright/test";

test("scroll reveals finish and the showcase keeps looping on hover", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const service = page.locator('#layanan a[href^="/jasa-"]').first();
  await service.scrollIntoViewIfNeeded();
  await expect.poll(() => service.evaluate(element =>
    element.getAnimations().some(animation => animation.effect instanceof KeyframeEffect && animation.effect.getKeyframes().some(frame => frame.opacity === "0.25")),
  )).toBeTruthy();
  await expect(service).toHaveCSS("opacity", "1");

  const showcase = page.getByLabel("Eksplorasi desain website kami");
  await showcase.scrollIntoViewIfNeeded();
  await showcase.hover();
  const rows = showcase.locator(':scope > div').filter({ has: page.locator(':scope > div[aria-hidden="true"]') });
  const directions = await rows.evaluateAll(elements => elements.map(element => ({
    direction: getComputedStyle(element).animationDirection,
    iterations: getComputedStyle(element).animationIterationCount,
    state: getComputedStyle(element).animationPlayState,
  })));
  expect(directions).toEqual([
    { direction: "normal", iterations: "infinite", state: "running" },
    { direction: "reverse", iterations: "infinite", state: "running" },
  ]);
});

test("reduced motion keeps content visible and backgrounds white", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const service = page.locator('#layanan a[href^="/jasa-"]').first();
  await service.scrollIntoViewIfNeeded();
  await expect(service).toHaveCSS("opacity", "1");
  expect(await service.evaluate(element => element.getAnimations().length)).toBe(0);
  for (const section of ["#tentang", "#layanan"]) {
    await expect(page.locator(section)).toHaveCSS("background-color", "rgb(255, 255, 255)");
  }
  await expect(page.locator("#konten").locator("..")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  const row = page.getByLabel("Eksplorasi desain website kami").locator(":scope > div").first();
  await expect(row).toHaveCSS("animation-name", "none");
});

test("selected work captions stay compact on desktop and mobile", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const title = page.locator('#portfolio a[href^="/portfolio/"] h3').first();
  await expect(title).toHaveCSS("font-size", "20px");
  await expect(page.locator("#portfolio")).toHaveCSS("padding-top", "72px");
  const cards = page.locator('#portfolio a[href^="/portfolio/"]');
  await expect(cards.nth(2)).toBeVisible();
  const widths = await cards.evaluateAll(elements => elements.slice(0, 3).map(element => element.getBoundingClientRect().width));
  expect(Math.max(...widths) - Math.min(...widths)).toBeLessThan(2);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(title).toHaveCSS("font-size", "18px");
  await expect(page.locator("#portfolio")).toHaveCSS("padding-top", "46px");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});
