import { pgTable, text, timestamp, boolean, varchar, jsonb } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  service: varchar("service", { length: 255 }),
  budget: varchar("budget", { length: 255 }),
  message: text("message"),
  status: varchar("status", { length: 50 }).default("Unread").notNull(), // Unread, Followed Up, Closed
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const portfolioCategories = pgTable("portfolio_categories", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull().unique(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const portfolios = pgTable("portfolios", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  categoryId: text("category_id").references(() => portfolioCategories.id),
  thumbnail: text("thumbnail"),
  result: text("result"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const services = pgTable("services", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  price: varchar("price", { length: 100 }),
  icon: varchar("icon", { length: 100 }), 
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }),
  quote: text("quote").notNull(),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  category: varchar("category", { length: 120 }).notNull(),
  status: varchar("status", { length: 50 }).default("draft").notNull(),
  thumbnail: text("thumbnail"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blogCategories = pgTable("blog_categories", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 120 }).notNull().unique(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pricings = pgTable("pricings", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  price: varchar("price", { length: 100 }).notNull(),
  description: text("description"),
  features: jsonb("features").$type<string[]>(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const websiteAnalyticsEvents = pgTable("website_analytics_events", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  eventType: varchar("event_type", { length: 50 }).notNull(),
  path: varchar("path", { length: 255 }).notNull(),
  source: varchar("source", { length: 255 }),
  href: text("href"),
  visitorId: text("visitor_id").notNull(),
  sessionId: text("session_id"),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Better Auth Schema (Minimum requirements based on their docs for Postgres)
export const users = pgTable("users", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("emailVerified").notNull(),
	image: text("image"),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull()
});

export const sessions = pgTable("sessions", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expiresAt").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
	ipAddress: text("ipAddress"),
	userAgent: text("userAgent"),
	userId: text("userId").notNull().references(() => users.id)
});

export const accounts = pgTable("accounts", {
	id: text("id").primaryKey(),
	accountId: text("accountId").notNull(),
	providerId: text("providerId").notNull(),
	userId: text("userId").notNull().references(() => users.id),
	accessToken: text("accessToken"),
	refreshToken: text("refreshToken"),
	idToken: text("idToken"),
	accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
	refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull()
});

export const verifications = pgTable("verifications", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expiresAt").notNull(),
	createdAt: timestamp("createdAt"),
	updatedAt: timestamp("updatedAt")
});
