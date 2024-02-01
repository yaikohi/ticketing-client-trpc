import { initTRPC, TRPCError } from "@trpc/server";
interface Context {
  user?: {
    id: string;
    isAdmin: boolean;
  };
}
export const t = initTRPC.context<Context>().create();

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const adminProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;

  if (!ctx.user?.isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      user: ctx.user,
    },
  });
});
