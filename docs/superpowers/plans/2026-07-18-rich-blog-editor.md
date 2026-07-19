# Rich Blog Editor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Admin can publish rich, attributed, tagged blog articles that render correctly on the public blog.

**Architecture:** Store sanitized HTML in the existing `content` field. Add `author` and `tags` to blog posts, provide a Tiptap editor in the admin form, and render stored HTML only after sanitization. The public list consumes the existing published-post and category data, with category filters expressed through the URL.

**Tech Stack:** Next.js 16 App Router, React 19, Drizzle/Postgres, Tiptap, Zod, sanitize-html.

## Global Constraints

- Keep changes local; do not create a commit.
- Use the existing blog post and category tables; no speculative tables.
- Published articles must retain a clear title, excerpt, author, category, tags, and rich content.
- Preserve existing Markdown fallback articles.

---

## Tasks

- [ ] Add the smallest supported rich-editor and HTML-sanitization dependencies, then add a migration and Drizzle schema fields for `author` and `tags`.
- [ ] Add one reusable admin rich-text editor with headings, bold, italic, underline, lists, links, alignment, font size, and undo/redo.
- [ ] Validate and sanitize article content in server actions; keep slugs unique and revalidate list/detail routes after mutations.
- [ ] Extend admin blog form and table with author and comma-separated tags.
- [ ] Consume published posts and categories in `/blog`; make category filters URL-driven and render rich HTML plus author/tags in detail pages.
- [ ] Block deletion of used categories and propagate category renames to existing articles.
- [ ] Verify smoke test, lint, and production build.
