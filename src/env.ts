import {z} from "zod";

//Arquivo para manejar as váriaveis de ambiente do projeto

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    POSTGRES_URL: z.string().url(),
    REDIS_URL: z.string().url(),
    WEB_URL: z.string().url()
})

export const env = envSchema.parse(process.env);