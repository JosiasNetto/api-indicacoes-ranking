import { fastify } from "fastify";  //Biblioteca do servidor
import { fastifyCors } from "@fastify/cors" ;//Biblioteca de gerencicamento do front com o back
import {  validatorCompiler //Determina o formato de dados enviados pelo user
    , serializerCompiler, //Transformacao de dados ao enviar para o front end
    type ZodTypeProvider,
    jsonSchemaTransform //Transforma os Schema JSON para o swagger
 } from "fastify-type-provider-zod";
 import { fastifySwagger } from "@fastify/swagger"  //Documentacao
 import { fastifySwaggerUi } from "@fastify/swagger-ui"
 import { env } from "./env";   //Importa o gerenciador de envs
 import { accessInviteLinkRoute } from "./routes/acessInviteLinkRoute";
 import { subscripeToEventRoute } from "./routes/subscriEventRoute";
import { getSubscriberInviteClicksRoute } from "./routes/getSubscriberInviteClicksRoute";
import { getSubscriberInviteCountRoute } from "./routes/getSubscriberInviteCountRoute";
import { getSubscriberRankingPositionRoute } from "./routes/getSubscriberRankingPositionRoute";
import { getRankingRoute } from "./routes/getRankingRoute";

const app = fastify().withTypeProvider<ZodTypeProvider>();  //Atribui o servidor a app

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
    origin: true,   //Define que qualquer origem pode fazer uma solicitacao ao servidor
})

app.register(fastifySwagger, {  //Define a documentacao
    openapi: {
        info: {
            title: "NLW Connect",
            version: "0.0.1"
        }
    },
    transform: jsonSchemaTransform 
})

app.register(fastifySwaggerUi, {
    routePrefix: "/docs"    //Define a rota para o site da documentacao
})

//Define as rotas
app.register(subscripeToEventRoute); 
app.register(accessInviteLinkRoute);
app.register(getSubscriberInviteClicksRoute);
app.register(getSubscriberInviteCountRoute);
app.register(getSubscriberRankingPositionRoute);
app.register(getRankingRoute);

//Executa o servidor
app.listen({ port : env.PORT }).then(() =>{
    console.log("HTTP server runing...")
})