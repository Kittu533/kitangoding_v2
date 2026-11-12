import assert from "node:assert/strict";
import test from "node:test";
import { buildPortfolioMetaDescription, isPlaceholderResult } from "../features/portfolio/description";

const base = { name: "Cari Unit", category: "Web App / Dashboard", brand: "Kitangoding" };

test("placeholder result is never used as the description", () => {
  assert.ok(isPlaceholderResult("Portfolio project"));
  assert.ok(isPlaceholderResult(" Portfolio project "));
  assert.ok(isPlaceholderResult(""));
  assert.ok(!isPlaceholderResult("Meningkatkan konversi"));

  const text = buildPortfolioMetaDescription({ ...base, result: "Portfolio project", features: [] });
  assert.ok(!text.includes("Portfolio project"));
  assert.equal(text, "Cari Unit: Studi kasus Web App / Dashboard oleh Kitangoding.");
});

test("a short result gets context so it is not a thin snippet", () => {
  const text = buildPortfolioMetaDescription({ ...base, result: "Meningkatkan absensi karyawan ", features: [] });
  assert.equal(text, "Meningkatkan absensi karyawan. Studi kasus Web App / Dashboard oleh Kitangoding.");
  assert.ok(text.length >= 70 && text.length <= 155);
});

test("long text is cut on a sentence boundary within 155 characters", () => {
  const features = [
    "Situs customer (publik)",
    "Beranda dengan form cari unit berdasarkan jadwal mulai dan selesai sewa.",
    "Filter pencarian: jenis kendaraan, tarif per jam atau per hari, transmisi, kursi, dan urutan harga.",
    "Halaman detail unit: foto, spesifikasi, fasilitas, aturan pemakaian, dan kalender ketersediaan.",
  ];
  const text = buildPortfolioMetaDescription({ ...base, result: "Portfolio project", features });
  assert.ok(text.length <= 155, `too long: ${text.length}`);
  assert.ok(text.length >= 70, `too short: ${text.length}`);
  assert.ok(text.startsWith("Beranda dengan form cari unit"), "headings must be skipped");
  assert.match(text, /[.!?]$/, "should end on a whole sentence");
});

test("one very long sentence is cut on a word boundary with an ellipsis", () => {
  const long = Array.from({ length: 80 }, (_, i) => `kata${i}`).join(" ");
  const text = buildPortfolioMetaDescription({ ...base, result: long, features: [] });
  assert.ok(text.length <= 155);
  assert.ok(text.endsWith("…"));
  assert.ok(!text.slice(0, -1).endsWith(" "), "no dangling space before the ellipsis");
});
