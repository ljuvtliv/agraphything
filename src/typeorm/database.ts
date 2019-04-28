import { Container, Service } from "typedi";
import * as TypeORM from "typeorm";
import * as TypeGraphQL from 'type-graphql';


import {DB_CONN} from "@base/config/config";
import { Context } from "@base/www"
import { Catalog, Image, Type, Agent } from "@base/typeorm"
import { CatalogResolver } from "./resolvers/catalog-resolver";
import { AuthChecker } from "type-graphql";

export const authChecker: AuthChecker<Context> = ({ context: { user, ctx } }, roles) => {
  console.log('running auth check');
  if (user !== null) {
    return true;
  }
  console.log('still running so user is null');
  return false;
};

@Service()
export class Database {
  connection: TypeORM.Connection;
  constructor() {
  }
  async connect() {
    TypeORM.useContainer(Container);
    if(DB_CONN.runtime == 'production'){
      this.connection = await TypeORM.createConnection({
        type: "postgres",
        url:DB_CONN.url,
        entities: [Catalog, Agent, Image, Type],
        synchronize: true,
      });

    }else{
      this.connection = await TypeORM.createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: DB_CONN.username,
        password: DB_CONN.password,
        database: DB_CONN.database,
        entities: [Catalog, Agent, Image, Type],
        synchronize: true,
      });
    }

    return true;
  }
  async getSchema() {
    // build TypeGraphQL executable schema
    return await TypeGraphQL.buildSchema({
      resolvers: [CatalogResolver],
      authChecker: authChecker,
      container: Container,
    });

  }
}
