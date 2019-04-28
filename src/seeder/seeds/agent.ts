import {Service, Inject} from "typedi";
import {Connection} from "typeorm";
import {InjectConnection} from "typeorm-typedi-extensions";
import { I_Seed } from "../i_seed";
import { Identification} from "@base/core"
import { Agent } from "@base/typeorm";

@Service()
export class AgentSeed implements I_Seed{

    @InjectConnection()
    private connection: Connection;

    @Inject()
    private ident: Identification;
    async seed(){
      console.log();
      const agent = new Agent();
      agent.name = "root";
      agent.agent_type = 1;
      agent.email = "julli@fjeldsted.is";
      agent.password = "notsecure";
      agent.acl = 1337;
      agent.enabled = true;
      agent.quota = null;
      agent.apinumber = 1; //This lets us "reset" api keys bump apinumber by one for a new UUID
      agent.apikey =  this.ident.Get(this.ident.GetNamespace("Api"),this.ident.getSalt()+agent.apinumber+agent.email+agent.name);

      agent.UUID = this.ident.Get(this.ident.GetNamespace("Agents"),agent.name);

      await this.connection.manager.save(agent);
    }
}
