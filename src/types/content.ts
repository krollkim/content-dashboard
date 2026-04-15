export type ContentStatus =
  | "inbox"
  | "starred"
  | "draft"
  | "approved"
  | "produced"
  | "published"
  | "archived";

export type ClientPersona =
  | "analytical_ceo"
  | "dreamer_founder"
  | "creative_director"
  | "growth_hacker"
  | "lifestyle_visionary";

export type ContentType = "feed" | "stories" | "both";

export type ViralSignalLabel =
  | "high_engagement"
  | "trending_topic"
  | "thought_leader"
  | "contrarian_take"
  | "timely_news";

export interface ViralSignals {
  label: ViralSignalLabel;
  engagementCount: number;
  trendTags: string[];
  confidenceScore: number; // 0–100
}

export interface MediaAsset {
  url: string;
  type: "image" | "video";
  alt: string;
}

export interface ContentPiece {
  id: string;
  title: string;
  sourceUrl?: string | null;
  rawExcerpt?: string | null;
  feedCopyEn?: string | null;
  storiesScriptHe?: string | null;
  visualDirection?: string | null;
  clientPersona?: ClientPersona | null;
  status: ContentStatus;
  contentType: ContentType;
  source: "scoutbot" | "telegram" | "apify" | "manual";
  viralSignals?: ViralSignals | null;
  mediaAssets?: MediaAsset[] | null;
  tags?: string[] | null;
  scheduledAt?: string | null;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Persona {
  id: string;
  key: ClientPersona;
  name: string;
  toneProfile: string;
  targetPain: string;
  exampleHook: string;
  color: string;
}

// ─── UI Helpers ───────────────────────────────────────────────────────────────

export const PERSONA_CONFIG: Record<
  ClientPersona,
  { label: string; color: string; cssVar: string }
> = {
  analytical_ceo: {
    label: "Analytical CEO",
    color: "#60A5FA",
    cssVar: "var(--persona-ceo)",
  },
  dreamer_founder: {
    label: "Dreamer Founder",
    color: "#F472B6",
    cssVar: "var(--persona-founder)",
  },
  creative_director: {
    label: "Creative Director",
    color: "#A78BFA",
    cssVar: "var(--persona-director)",
  },
  growth_hacker: {
    label: "Growth Hacker",
    color: "#34D399",
    cssVar: "var(--persona-hacker)",
  },
  lifestyle_visionary: {
    label: "Lifestyle Visionary",
    color: "#FB923C",
    cssVar: "var(--persona-visionary)",
  },
};

export const STATUS_CONFIG: Record<
  ContentStatus,
  { label: string; color: string }
> = {
  inbox: { label: "Inbox", color: "#3B82F6" },
  starred: { label: "Starred", color: "#F59E0B" },
  draft: { label: "Draft", color: "#6B7280" },
  approved: { label: "Approved", color: "#10B981" },
  produced: { label: "Produced", color: "#8B5CF6" },
  published: { label: "Published", color: "#E8FF5A" },
  archived: { label: "Archived", color: "#374151" },
};

export const VIRAL_SIGNAL_CONFIG: Record<
  ViralSignalLabel,
  { label: string; emoji: string }
> = {
  high_engagement: { label: "High Engagement", emoji: "🔥" },
  trending_topic: { label: "Trending Topic", emoji: "📈" },
  thought_leader: { label: "Thought Leader", emoji: "💡" },
  contrarian_take: { label: "Contrarian Take", emoji: "⚡" },
  timely_news: { label: "Timely News", emoji: "📰" },
};
