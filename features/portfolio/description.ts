import { fitMetaDescription, META_DESCRIPTION_MIN } from "@/lib/seo";

export type DescriptionBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string; label?: string; lead?: boolean };

const SENTENCE_END = /[.!?…]["”’')\]]*$/u;
const STARTS_LOWERCASE = /^\p{Ll}/u;
const MAX_HEADING_LENGTH = 70;
const MAX_LABEL_LENGTH = 60;
const MAX_PARAGRAPH_LENGTH = 520;
// Default `result` that features/portfolio/queries.ts falls back to when the field is empty.
const PLACEHOLDER_RESULT = "Portfolio project";

export function isPlaceholderResult(result: string | null | undefined) {
  return !result || result.trim() === PLACEHOLDER_RESULT;
}

/**
 * Cleans bullet markers, drops repeated blank lines, and re-joins sentences that were
 * hard-wrapped in the middle (previous line ends with a comma, or the next one starts lowercase).
 * An empty string in the result marks a paragraph break.
 */
function normalizeLines(rawLines: string[]) {
  const lines: string[] = [];
  for (const raw of rawLines) {
    const line = raw.trim().replace(/^(?:[-•]\s*|\*\s+)/, "");
    const previous = lines[lines.length - 1];
    if (!line) {
      if (previous) lines.push("");
      continue;
    }
    const continuesPrevious =
      previous &&
      !previous.startsWith("#") &&
      !line.startsWith("#") &&
      (previous.endsWith(",") || (STARTS_LOWERCASE.test(line) && !SENTENCE_END.test(previous) && !previous.endsWith(":")));
    if (continuesPrevious) lines[lines.length - 1] = `${previous} ${line}`;
    else lines.push(line);
  }
  while (lines[lines.length - 1] === "") lines.pop();
  return lines;
}

function isImplicitHeading(line: string, next?: string) {
  return (
    line.length <= MAX_HEADING_LENGTH &&
    !SENTENCE_END.test(line) &&
    !/[:;,]$/.test(line) &&
    !!next &&
    !next.startsWith("#") &&
    !STARTS_LOWERCASE.test(next) &&
    (SENTENCE_END.test(next) || next.endsWith(":"))
  );
}

function buildBlocks(rawLines: string[], lead: boolean): DescriptionBlock[] {
  const lines = normalizeLines(rawLines);
  const blocks: DescriptionBlock[] = [];
  let paragraph = null as { label?: string; text: string } | null;

  const flush = () => {
    if (paragraph && (paragraph.text || paragraph.label)) blocks.push({ type: "paragraph", ...paragraph, ...(lead ? { lead } : {}) });
    paragraph = null;
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line) {
      flush();
      continue;
    }

    const explicitHeading = line.match(/^#{1,6}\s+(.+)$/);
    const next = lines[index + 1] === "" ? lines[index + 2] : lines[index + 1];
    if (explicitHeading || (!lead && isImplicitHeading(line, next))) {
      flush();
      blocks.push({ type: "heading", text: (explicitHeading?.[1] ?? line).replace(/^\d+[.)]\s+/, "").trim() });
      continue;
    }

    if (!lead && line.endsWith(":") && line.length <= MAX_LABEL_LENGTH) {
      flush();
      paragraph = { label: line, text: "" };
      continue;
    }

    const sentence = SENTENCE_END.test(line) || line.endsWith(":") ? line : `${line}.`;
    if (paragraph?.text && paragraph.text.length + sentence.length > MAX_PARAGRAPH_LENGTH) {
      flush();
    }
    paragraph = paragraph
      ? { ...paragraph, text: paragraph.text ? `${paragraph.text} ${sentence}` : sentence }
      : { text: sentence };
  }
  flush();

  return blocks;
}

/**
 * Turns the portfolio `result` (intro) and stored `features` lines into blog-style blocks:
 * sub-headings plus flowing paragraphs instead of one bullet per line.
 *
 * - `## Judul` always makes a heading. A short line without final punctuation that is followed
 *   by a sentence is treated as a heading too.
 * - A short line ending with ":" labels the sentences that follow it.
 * - Consecutive sentences are grouped into one paragraph (up to ~520 characters).
 * - A blank line always starts a new paragraph.
 */
export function toDescriptionBlocks(result: string, features: string[]): DescriptionBlock[] {
  const intro = isPlaceholderResult(result) ? [] : result.split("\n");
  return [...buildBlocks(intro, true), ...buildBlocks(features, false)];
}

function endSentence(text: string) {
  return /[.!?…]["”’')\]]*$/u.test(text) ? text : `${text}.`;
}

/**
 * Search-result description for a portfolio detail page, built from the same text shown on the page.
 * Never returns the "Portfolio project" placeholder and always lands between ~70 and 155 characters.
 */
export function buildPortfolioMetaDescription(project: {
  name: string;
  category: string;
  result: string;
  features: string[];
  brand: string;
}): string {
  const body = toDescriptionBlocks(project.result, project.features)
    .flatMap((block) => (block.type === "paragraph" ? [block.label ? `${block.label} ${block.text}` : block.text] : []))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  const context = `Studi kasus ${project.category} oleh ${project.brand}.`;

  if (!body) return fitMetaDescription(`${project.name}: ${context}`);

  const description = endSentence(body);
  return fitMetaDescription(description.length < META_DESCRIPTION_MIN ? `${description} ${context}` : description);
}
