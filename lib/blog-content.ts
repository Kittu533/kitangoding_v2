import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "a",
  "blockquote",
  "br",
  "em",
  "h2",
  "h3",
  "h4",
  "li",
  "ol",
  "p",
  "s",
  "span",
  "strong",
  "u",
  "ul",
];

export function sanitizeRichTextHtml(value: string) {
  return sanitizeHtml(value, {
    allowedTags,
    allowedAttributes: {
      a: ["href", "rel", "target"],
      h2: ["style"],
      h3: ["style"],
      h4: ["style"],
      p: ["style"],
      span: ["style"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedStyles: {
      "*": {
        "font-size": [/^\d{1,3}(?:\.\d+)?(px|pt|em|rem|%)$/],
        "text-align": [/^(left|center|right|justify)$/],
      },
    },
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          ...(attribs.target === "_blank" ? { rel: "noopener noreferrer" } : {}),
        },
      }),
    },
  }).trim();
}

export function richTextToPlainText(value: string) {
  return sanitizeHtml(sanitizeRichTextHtml(value), {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/\s+/g, " ")
    .trim();
}
