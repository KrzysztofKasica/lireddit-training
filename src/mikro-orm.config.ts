import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from 'path';
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { User } from "./entities/User";

export default {
    migrations: {
        path: path.join(__dirname, './migrations'), // path to the folder with migrations
        disableForeignKeys: false,
    },
    entities: [Post, User],  
    dbName: 'lireddit',
    user: 'default',
    password: '',
    type: 'postgresql',
    debug: !__prod__, 
}as Parameters<typeof MikroORM.init<PostgreSqlDriver>>[0];