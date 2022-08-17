import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core"
import { SqlEntityManager, PostgreSqlDriver } from "@mikro-orm/postgresql"
import { Request, Response } from "express"
import session from "express-session"

export type MyContext = {
    em: SqlEntityManager<PostgreSqlDriver> & EntityManager<IDatabaseDriver<Connection>>,
    req: Request & {session: session.Session & Partial<session.SessionData> & {userId: number}},
    res: Response
}