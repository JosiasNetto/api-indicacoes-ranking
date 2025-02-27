import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { env } from "../env";
import { getSubscriberInviteClicks } from "../functions/getSubsriberInviteClicks";

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod = async (app) => {
    app.get("/subsribers/:subscriberId/ranking/clicks", {
        schema: {
            summary: "Get subscriber invite clicks count",
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

        const { count } = await getSubscriberInviteClicks({subscriberId});

        return { count };
    })
}
