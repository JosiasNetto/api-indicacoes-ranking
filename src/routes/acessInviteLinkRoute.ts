import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { env } from "../env";
import { accessInviteLink } from "../functions/accessInviteLink";

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
    app.get("/invites/:subscriberId", {
        schema: {
            summary: "Access invite link and redirects user",
            tags: ["referral"],
            params: z.object({
                subscriberId: z.string()
            }), 
            response: {
                302: z.null()
            },
        }
    } ,  async (req, res) => {
        const { subscriberId } = req.params;

        const redirectUrl = new URL(env.WEB_URL)

        await accessInviteLink({subscriberId});

        //See the count of the hash of the redis
        //console.log(await redis.hgetall("referral:access-count"))

        redirectUrl.searchParams.set("referrer", subscriberId);
  
        //301: redirect permanente
        //302: redirect temporario 
        return res.redirect(redirectUrl.toString(), 302);
    })
}
