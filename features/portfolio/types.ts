export type PortfolioCard = {
  id: string;
  slug: string;
  category: string;
  name: string;
  result: string;
  thumbnail?: string | null;
  linkPreview?: string | null;
};

export type PortfolioDetail = PortfolioCard & {
  role: string | null;
  features: string[];
  gallery: string[];
};

