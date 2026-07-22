import type { FullResult, Reporter, TestCase, TestResult } from "@playwright/test/reporter";

type SpeedResult = {
  test: string;
  halaman: string;
  domContentLoaded: number | "-";
  load: number;
  status: "LULUS" | "GAGAL";
};

export default class PageSpeedReporter implements Reporter {
  private results: SpeedResult[] = [];

  onTestEnd(_test: TestCase, result: TestResult) {
    for (const attachment of result.attachments) {
      if (attachment.name === "page-speed" && attachment.body) {
        this.results.push(...(JSON.parse(attachment.body.toString()) as SpeedResult[]));
      }
    }
  }

  onEnd(result: FullResult) {
    const maxPageLoadMs = Number(process.env.MAX_PAGE_LOAD_MS ?? 5_000);
    const failed = this.results.filter(({ status }) => status === "GAGAL").length;

    console.log(`\n=== RINGKASAN PAGE SPEED (batas ${maxPageLoadMs}ms) ===`);
    console.table(this.results);
    console.log(`Hasil: ${this.results.length - failed} lulus, ${failed} gagal.`);
    console.log(`Status suite: ${result.status.toUpperCase()}\n`);
  }
}
