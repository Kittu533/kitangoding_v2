# Blog Editorial Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the public article detail page into a spacious editorial layout that reads well on desktop and mobile.

**Architecture:** Keep the existing article data and sidebar cards. Move the cover image into a wide visual section, constrain the reading column to 780px, and make the sidebar sticky only on extra-large screens.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS.

## Global Constraints

- Keep the existing rich HTML rendering, structured data, and related-content cards.
- Do not add dependencies or change database data.
- Keep the reading layout single-column on small screens.

---

## Tasks

- [x] Write a source smoke test that requires a wide editorial cover, a 780px reading column, and an extra-large sticky sidebar.
- [x] Move the existing article cover outside the body card and change the main grid to `minmax(0,780px)` plus a 300px sidebar.
- [x] Keep article typography and tags in the reading column; apply sticky positioning to the existing sidebar only from `xl`.
- [x] Run the smoke test, lint, and production build.
