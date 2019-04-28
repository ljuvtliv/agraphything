import "reflect-metadata";
const moduleAlias = require('module-alias')
moduleAlias.addAlias('@base', __dirname);

import { Container } from "typedi";
import {Database} from './typeorm';
import {Web} from './www';
import {Seeder} from './seeder';
async function boot(){
  try {
      let database : Database = Container.get(Database);
      await database.connect();

      let seeder: Seeder = Container.get(Seeder)
      await seeder.seedall();


      let web: Web = Container.get(Web);
      await web.serve();
  } catch(e){
    console.error(e);
  }
}
boot();
