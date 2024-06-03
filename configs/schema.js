const {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
} = require("drizzle-orm/pg-core");

export const JsonForms = pgTable("jsonForms", {
  id: serial("id").primaryKey(),
  jsonform: text("jsonform").notNull(),
  theme: varchar("theme"),
  background: varchar("background"),
  style: varchar("style"),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
  enableSignIn: boolean("enableSignIn").default(false),
});

export const userResponses = pgTable("userResponses", {
  id: serial("id").primaryKey(),
  jsonResponse: text("jsonResponse").notNull(),
  createdBy: varchar("createdBy").default("anonymous"),
  createdAt: varchar("createdAt").notNull(),
  formId: integer("formId").references(() => JsonForms.id),
});

export const userSubscription = pgTable("userSubscription", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 256 }).notNull().unique(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 256 }).unique(),
  stripeSubscriptionId: varchar("stripeSubscriptionId", {
    length: 256,
  }).unique(),
  stripePriceId: varchar("stripePriceId", { length: 256 }),
  stripeCurrentPeriodEnd: timestamp("stripeCurrentPeriodEnd"),
});
