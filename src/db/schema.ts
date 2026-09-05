import {
  sqliteTable,
  integer,
  text,
} from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  tagline: text("tagline"),
  description: text("description"),
  challenge: text("challenge"),
  idea: text("idea"),
  design: text("design"),
  development: text("development"),
  results: text("results"),
  thumbnail: text("thumbnail"),
  heroImage: text("hero_image"),
  gallery: text("gallery", { mode: "json" }).$type<string[]>().default([]),
  technologies: text("technologies", { mode: "json" }).$type<string[]>().default([]),
  client: text("client"),
  year: text("year"),
  status: text("status").default("published"),
  featured: integer("featured", { mode: "boolean" }).default(false),
  color: text("color").default("#D4FF3F"),
  stats: text("stats", { mode: "json" }).$type<{ label: string; value: string }[]>().default([]),
  timeline: text("timeline"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message").notNull(),
  status: text("status").default("new"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const projectRequests = sqliteTable("project_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  projectType: text("project_type"),
  budget: text("budget"),
  timeline: text("timeline"),
  description: text("description").notNull(),
  status: text("status").default("new"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const newsletterSubscribers = sqliteTable("newsletter_subscribers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const adminUsers = sqliteTable("admin_users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("admin"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type ProjectRequest = typeof projectRequests.$inferSelect;
