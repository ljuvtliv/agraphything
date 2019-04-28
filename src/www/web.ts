import { Container, Service, Inject } from "typedi";
import * as Koa from 'koa';
import * as Router from 'koa-router';
import { ApolloServer } from "apollo-server-koa";

import { router } from './router'
import { Agent, Database } from "@base/typeorm";
import { Identification } from "@base/core";


export interface Context {
  user: Agent;
  ctx;
}
@Service()
export class Web {
  koa: Koa;
  router: Router;
  apolloServer: ApolloServer;
  @Inject() database: Database;
  @Inject() ident: Identification;
  port: number;
  constructor() {
    this.koa = new Koa();
    this.router = router;

    this.koa.use(this.router.routes()).use(this.router.allowedMethods());
    this.port = 4050;
  }
  async bootGraphQL() {
    let schema = await this.database.getSchema();
    let app = this.koa;
    let db = this.database;
    let context = async function({ user, ctx }): Promise<Context> {
      console.log('context');
      // get the user token from the headers
      const token = ctx.request.headers['x-auth'] || '';

      // try to retrieve a user with the token
      let agent = await db.connection.getRepository(Agent).findOne({ where: { apikey: token } });
      if (agent === undefined) {
        return { user: null, ctx }
      };
      // add the user to the context
      return { user: agent, ctx: ctx };
    }
    this.apolloServer = new ApolloServer({
      schema,
      context: context, // this is the key part
    });
    this.apolloServer.applyMiddleware({ app });
  }
  async serve() {
    await this.bootGraphQL();
    this.koa.listen({ port: this.port }, () =>
      console.log(`🚀 Server ready at http://localhost:`+this.port+`${this.apolloServer.graphqlPath}`),
    );
    console.log('readyforbissniss v2')
  }
}
