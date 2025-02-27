import { fastify } from "fastify";  //Biblioteca do servidor
import { fastifyCors } from "@fastify/cors" ;//Biblioteca de gerencicamento do front com o back
import {  validatorCompiler //Determina o formato de dados enviados pelo user
    , serializerCompiler, //Transformacao de dados ao enviar para o front end
    type ZodTypeProvider,
    jsonSchemaTransform
 } from "fastify-type-provider-zod";
 import { z } from "zod";
 import { fastifySwagger } from "@fastify/swagger"
 import { fastifySwaggerUi } from "@fastify/swagger-ui"
import { subscripeToEventRoute } from "./routes/subscriEventRoute";
import { env } from "./env";
import { accessInviteLinkRoute } from "./routes/acessInviteLinkRoute";
import { getSubscriberInviteClicksRoute } from "./routes/getSubscriberInviteClicksRoute";
import { getSubscriberInviteCountRoute } from "./routes/getSubscriberInviteCountRoute";
import { getSubscriberRankingPositionRoute } from "./routes/getSubscriberRankingPositionRoute";
import { getRankingRoute } from "./routes/getRankingRoute";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
    origin: true,
})

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "NLW Connect",
            version: "0.0.1"
        }
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
    routePrefix: "/docs"
})

app.get("/hello", () =>{
    return "Hello world"
})

app.register(subscripeToEventRoute); 
app.register(accessInviteLinkRoute);
app.register(getSubscriberInviteClicksRoute);
app.register(getSubscriberInviteCountRoute);
app.register(getSubscriberRankingPositionRoute);
app.register(getRankingRoute);

app.listen({ port : env.PORT }).then(() =>{
    console.log("HTTP server runing...")
})