"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const moduleAlias = require('module-alias');
moduleAlias.addAlias('@base', __dirname);
const typedi_1 = require("typedi");
const typeorm_1 = require("./typeorm");
const www_1 = require("./www");
const seeder_1 = require("./seeder");
function boot() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let database = typedi_1.Container.get(typeorm_1.Database);
            yield database.connect();
            let seeder = typedi_1.Container.get(seeder_1.Seeder);
            yield seeder.seedall();
            let web = typedi_1.Container.get(www_1.Web);
            yield web.serve();
        }
        catch (e) {
            console.error(e);
        }
    });
}
boot();
//# sourceMappingURL=index.js.map