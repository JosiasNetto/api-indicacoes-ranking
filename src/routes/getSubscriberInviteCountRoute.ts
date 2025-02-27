import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { env } from "../env";
import { getSubscriberInviteCount } from "../functions/getSubscriberInviteCount";

export const getSubscriberInviteCountRoute: FastifyPluginAsyncZod = async (app) => {
    app.get("/subscribers/:subscriberId/ranking/count", {
        schema: {
            summary: "Get subscriber invite count",
            tags: ["referral"],
            params: z.object({
                subscriberId: z.string()
            }), 
            response: {
                200: z.object({ 
                    count: z.number()
                })
            },
        }
    } ,  async (req) => {
        const { subscriberId } = req.params;

        const redirectUrl = new URL(env.WEB_URL)

        const { count } = await getSubscriberInviteCount({subscriberId});

        return { count };
    })
}
