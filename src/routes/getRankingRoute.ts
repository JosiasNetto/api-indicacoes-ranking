import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { env } from "../env";
import { getSubscriberInviteClicks } from "../functions/getSubsriberInviteClicks";
import { getRanking } from "../functions/getRanking";

export const getRankingRoute: FastifyPluginAsyncZod = async (app) => {
    app.get("/ranking", {
        schema: {
            summary: "Get ranking",
            tags: ["referral"],
            response: {
                200: z.object({ 
                    ranking: z.array(
                        z.object({
                            id: z.string(),
                            name: z.string(),
                            score: z.number()
                        })
                    )
                })
            },
        }
    } ,  async (req) => {
        const { rankingWithScore } = await getRanking();
        return { ranking: rankingWithScore }
    })
}
