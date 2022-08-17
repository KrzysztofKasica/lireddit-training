import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config"
import type { PostgreSqlDriver } from '@mikro-orm/postgresql';
import express from "express"
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import "reflect-metadata"
import { UserResolver } from "./resolvers/user";
import session from "express-session";
import { createClient } from "redis";


const main = async() => {
    const orm = await MikroORM.init<PostgreSqlDriver>(microConfig);
    await orm.getMigrator().up();
    
    const app = express();
    const RedisStore = require("connect-redis")(session)

    // redis@v4
    const redisClient = createClient({ legacyMode: true })
    redisClient.connect().catch(console.error)
    app.use(
        session({
        name: 'qid',
        store: new RedisStore({ client: redisClient, disableTouch: true,  }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 356 * 10,// 10 years
            httpOnly: true,
            secure: __prod__, // cookie only works in https
            sameSite: 'lax' // csrf
        },
        saveUninitialized: false,
        secret: "wgrgwrgwrgwrgwwr",
        resave: false,
        })
    )
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false,
        }),
        context: ({req, res}) => ({ em: orm.em, req, res})
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({app});

    app.listen(4000, () => {
        console.log('server started on port 4000');
    });
};

main().catch((err) => {
    console.log(err);
}); 
