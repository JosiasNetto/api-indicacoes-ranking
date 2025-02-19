import { fastify } from "fastify";  //Biblioteca do servidor
import { fastifyCors } from "@fastify/cors" ;//Biblioteca de gerencicamento do front com o back
import { validatorCompiler //Determina o formato de dados enviados pelo user
    , serializerCompiler, //Transformacao de dados ao enviar para o front end
    ZodTypeProvider
 } from "fastify-type-provider-zod";
 import { z } from "zod";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
    origin: true,
})

app.get("/hello", () =>{
    return "Hello world"
})

app.post("/subscriptions", {
    schema: {
        body: z.object({
            name: z.string(),
            email: z.string().email()
        }),
        response: {
            201: 
        }
    }
} ,  (req, res) => {
    const { name, email } = req.body;
    return res.status(201).send({
        name,
        email
    })
})

app.listen({ port : 3333 }).then(() =>{
    console.log("HTTP server runing...")
})
