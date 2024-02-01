import { wrap } from "@decs/typeschema";
import { string } from "valibot";
import { createTRPCRouter, publicProcedure } from "../utils";

export const userRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      wrap(
        string(),
      ),
    )
    .query(({ input }) => {
      return `Hello ${input}!`;
    }),
});
