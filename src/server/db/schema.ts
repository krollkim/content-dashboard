import {
  pgTable,
  uuid,
  text,
  jsonb,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const contentStatusEnum = pgEnum("content_status", [
  "inbox",
  "starred",
  "draft",
  "approved",
  "produced",
  "published",
  "archived",
]);

export const clientPersonaEnum = pgEnum("client_persona", [
  "analytical_ceo",
  "dreamer_founder",
  "creative_director",
  "growth_hacker",
  "lifestyle_visionary",
]);

export const contentTypeEnum = pgEnum("content_type", [
  "feed",
  "stories",
  "both",
]);

export const contentSourceEnum = pgEnum("content_source", [
  "scoutbot",
  "telegram",
  "apify",
  "manual",
]);

export const viralSignalLabelEnum = pgEnum("viral_signal_label", [
  "high_engagement",
  "trending_topic",
  "thought_leader",
  "contrarian_take",
  "timely_news",
]);

export const pipelineEventEnum = pgEnum("pipeline_event", [
  "ingested",
  "ai_processed",
  "starred",
  "approved",
  "rejected",
  "produced",
  "published",
  "archived",
]);

// ─── Tables ───────────────────────────────────────────────────────────────────

export const contentPieces = pgTable("content_pieces", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  sourceUrl: text("source_url"),
  rawExcerpt: text("raw_excerpt"),

  // Dual-language copy
  feedCopyEn: text("feed_copy_en"),
  storiesScriptHe: text("stories_script_he"),
  visualDirection: text("visual_direction"),

  // Classification
  clientPersona: clientPersonaEnum("client_persona"),
  status: contentStatusEnum("status").notNull().default("inbox"),
  contentType: contentTypeEnum("content_type").notNull().default("both"),
  source: contentSourceEnum("source").notNull().default("manual"),

  // Viral intelligence (stored as JSONB)
  // Shape: { label: string, engagementCount: number, trendTags: string[], confidenceScore: number }
  viralSignals: jsonb("viral_signals"),

  // Media
  mediaAssets: jsonb("media_assets"), // Array<{ url: string, type: 'image'|'video', alt: string }>
  tags: text("tags").array(),

  // Scheduling
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
  publishedAt: timestamp("published_at", { withTimezone: true }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const personas = pgTable("personas", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: clientPersonaEnum("key").notNull().unique(),
  name: text("name").notNull(),
  toneProfile: text("tone_profile").notNull(),
  targetPain: text("target_pain").notNull(),
  exampleHook: text("example_hook").notNull(),
  color: text("color").notNull().default("#6B7280"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const pipelineLogs = pgTable("pipeline_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  contentId: uuid("content_id").references(() => contentPieces.id, {
    onDelete: "cascade",
  }),
  event: pipelineEventEnum("event").notNull(),
  payload: jsonb("payload"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ─── TypeScript Types ─────────────────────────────────────────────────────────

export type ContentPiece = typeof contentPieces.$inferSelect;
export type NewContentPiece = typeof contentPieces.$inferInsert;
export type Persona = typeof personas.$inferSelect;
export type PipelineLog = typeof pipelineLogs.$inferSelect;

export type ContentStatus = ContentPiece["status"];
export type ClientPersona = ContentPiece["clientPersona"];

export interface ViralSignals {
  label:
    | "high_engagement"
    | "trending_topic"
    | "thought_leader"
    | "contrarian_take"
    | "timely_news";
  engagementCount: number;
  trendTags: string[];
  confidenceScore: number; // 0-100
}

export interface MediaAsset {
  url: string;
  type: "image" | "video";
  alt: string;
}
