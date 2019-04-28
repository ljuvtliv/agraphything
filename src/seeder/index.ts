import {I_Seed} from "./i_seed";
import {AgentSeed,CatalogSeed,TypeSeed} from "./seeds/";
import { Service } from "typedi";

@Service()
export class Seeder {
  private seeds:Array<I_Seed>;
  constructor(){
    this.seeds = [];
    this.seeds['agent'] = new AgentSeed();
    this.seeds['catalog'] = new CatalogSeed();
    this.seeds['type'] = new TypeSeed();
  }
  async seedall(){
    for (let obj of this.seeds) {
      obj.seed();
      break;
    }
  }
}
