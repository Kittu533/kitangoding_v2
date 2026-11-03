import assert from "node:assert/strict";
import test from "node:test";
import { getAuthorInitials, getBlogAuthorName } from "../features/blog/authors";

test("blog author labels use the current brand while preserving individual authors", () => {
  assert.equal(getBlogAuthorName("Tim kitangoding"), "Tim Kitangoding");
  assert.equal(getBlogAuthorName("kitangoding.id"), "Kitangoding");
  assert.equal(getBlogAuthorName(undefined), "Kitangoding");
  assert.equal(getBlogAuthorName("Tim Rekalur"), "Tim Kitangoding");
  assert.equal(getBlogAuthorName("  Ryo Surya  "), "Ryo Surya");
  assert.equal(getAuthorInitials("Tim Kitangoding"), "TK");
  assert.equal(getAuthorInitials(" Ryo   Surya Atmaja "), "RS");
});
