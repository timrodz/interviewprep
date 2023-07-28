/** TODO: Tasks
 * 1. Paginate `getAll` queries
 */

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const questionsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        approved: z.boolean(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.question.findMany({
        where: { approved: input.approved },
      });
    }),
  getAllByTechnology: publicProcedure
    .input(z.string())
    .query(({ ctx, input: technology }) => {
      return ctx.prisma.question.findMany({
        where: {
          technology,
          approved: true,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        technology: z.string(),
        title: z.string(),
        answer: z.string(),
        resources: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log(`input: ${JSON.stringify(input)}`);

      // TODO: Check for duplicates

      await ctx.prisma.question.create({
        data: {
          technology: input.technology.trim(),
          title: input.title.trim(),
          answer: input.answer.trim(),
          resources: input.resources.trim(),
          approved: false,
        },
      });
    }),
  search: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: query }) => {
      console.log("Searching for term", query);
      throw new Error("dumb");
      return ctx.prisma.question.findFirst({
        where: {
          // Experiment A: just search by titlees
          title: { contains: query },

          // Experiment B: Search by title and answer
          // OR: [
          //   {
          //     title: { contains: id },
          //   },
          //   {
          //     answer: {
          //       contains: id,
          //     },
          //   },
          // ],
        },
      });
    }),
  approve: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: id }) => {
      await ctx.prisma.question.update({
        where: {
          id,
        },
        data: {
          approved: true,
        },
      });
    }),
  unapprove: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: id }) => {
      await ctx.prisma.question.update({
        where: {
          id,
        },
        data: {
          approved: false,
        },
      });
    }),
});
