import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { env } from "../env";
import { getSubscriberRankingPosition } from "../functions/getSubscriberRankingPosition";

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod = async (app) => {
    app.get("/subscribers/:subscriberId/ranking/position", {
        schema: {
            summary: "Get subscriber ranking position",
            tags: ["referral"],
            params: z.object({
                subscriberId: z.string()
            }), 
            response: {
                200: z.object({ 
                    position: z.number().nullable()
                })
            },
        }
    } ,  async (req) => {
        const { subscriberId } = req.params;

        const redirectUrl = new URL(env.WEB_URL)

        const { position } = await getSubscriberRankingPosition({subscriberId});

        return { position };
    })
}
