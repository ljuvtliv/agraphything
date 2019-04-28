import {Service} from "typedi";
import v5 = require('uuid/v5');

@Service()
export class Identification{
  rootUUID: string;
  private SaltKey: string;
  constructor(){
    this.rootUUID = "00000000-0000-0000-0000-000000000000";
    this.SaltKey = "changeme";
  }
  getSalt(){
    return this.SaltKey;
  }
  hashWithSalt(value:string){

  }
  GetNamespace(name:string){
    return v5(name, this.rootUUID);
  }
  Get(namespace:string,name:string){
    return v5(name,namespace);
  }
}
