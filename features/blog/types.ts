export type PublicBlogCard = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  publishedAt?: string;
  author?: string;
};

export type PublicBlogCategory = {
  label: string;
  active?: boolean;
};

export type PublicBlogDetail = PublicBlogCard & {
  modifiedAt?: string;
  content: string;
  contentFormat?: "html";
  tags?: string[];
};
