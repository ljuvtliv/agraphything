import {Service, Inject} from "typedi";
import {Connection} from "typeorm";
import {InjectConnection} from "typeorm-typedi-extensions";
import { I_Seed } from "../i_seed";
import { Identification} from "@base/core"
import { Type } from "@base/typeorm";

@Service()
export class TypeSeed implements I_Seed{

    @InjectConnection()
    private connection: Connection;

    @Inject()
    private ident: Identification;
    async seed(){
      console.log();
      const sw = new Type();
      sw.Name = "switch";
      sw.Description = "A Switchy Switch";
      sw.UUID = this.ident.GetNamespace(sw.Name);

      await this.connection.manager.save(sw);

      const wii = new Type();
      wii.Name = "wii";
      wii.Description = "A wiiitchy wiii";
      wii.UUID = this.ident.GetNamespace(wii.Name);

      await this.connection.manager.save(wii);

      //see types
    }
}
