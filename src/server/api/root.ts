import { exampleRouter } from "./routers/example";
import { userRouter } from "./routers/user";
import { createTRPCRouter } from "./utils";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
