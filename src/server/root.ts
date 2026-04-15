import { router } from "@/server/trpc";
import { contentRouter } from "@/server/routers/content";
import { personasRouter } from "@/server/routers/personas";

export const appRouter = router({
  content: contentRouter,
  personas: personasRouter,
});

export type AppRouter = typeof appRouter;
