import { Service, Inject } from "typedi";
import { Connection, getManager } from "typeorm";
import { InjectConnection } from "typeorm-typedi-extensions";
import { I_Seed } from "../i_seed";
import { Identification } from "@base/core"
import { Catalog, Type, Agent } from "@base/typeorm";

@Service()
export class CatalogSeed implements I_Seed {

  @InjectConnection()
  private connection: Connection;

  @Inject()
  private ident: Identification;
  async seed() {
    console.log();
    let type = await this.connection.getRepository(Type).findOne({ where: { UUID: this.ident.GetNamespace('switch') } });
    let agent = await this.connection.getRepository(Agent).findOne({ where: { UUID: this.ident.Get(this.ident.GetNamespace('Agents'), "root") } });
    let count = 100;
    for (var i = 0; i < count; i++) {
      const cata = new Catalog();
      cata.name = "test" + i;
      cata.description = "Test switch catalog item" + i;
      cata.releaseDate = new Date();
      cata.type = type;
      cata.internal_created_by = agent;
      cata.internal_updated_by = agent;
      cata.UUID = this.ident.Get(this.ident.GetNamespace("switch"), cata.name);
      await this.connection.manager.save(cata);
    }
  }
}
