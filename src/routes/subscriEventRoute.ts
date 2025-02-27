import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { subscribeToEvent } from "../functions/subscribeToEvent";

export const subscripeToEventRoute: FastifyPluginAsyncZod = async (app) => {
    app.post("/subscriptions", {
        schema: {
            summary: "Subscribe someone to the event",
            body: z.object({
                name: z.string(),
                email: z.string().email(),
                referrer: z.string().nullish()
            }), 
            response: {
                201: z.object({ 
                    subscriberId: z.string()
                })
            },
        }
    } ,  async (req, res) => {
        const { name, email, referrer } = req.body;

        const { subscriberId } = await subscribeToEvent({name, email, referrerId: referrer})

        return res.status(201).send({
            subscriberId
        })
    })
}
