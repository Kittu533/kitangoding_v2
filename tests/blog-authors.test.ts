import assert from "node:assert/strict";
import test from "node:test";
import { getAuthorInitials, getBlogAuthorName } from "../features/blog/authors";

test("blog rebrand updates legacy team names while preserving individual authors", () => {
  assert.equal(getBlogAuthorName("Tim kitangoding"), "Tim Rekalur");
  assert.equal(getBlogAuthorName("kitangoding.id"), "Rekalur");
  assert.equal(getBlogAuthorName(undefined), "Rekalur");
  assert.equal(getBlogAuthorName("  Ryo Surya  "), "Ryo Surya");
  assert.equal(getAuthorInitials("Tim Rekalur"), "TR");
  assert.equal(getAuthorInitials(" Ryo   Surya Atmaja "), "RS");
});
