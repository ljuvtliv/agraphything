"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const TypeORM = require("typeorm");
const TypeGraphQL = require("type-graphql");
const config_1 = require("@base/config/config");
const typeorm_1 = require("@base/typeorm");
const catalog_resolver_1 = require("./resolvers/catalog-resolver");
exports.authChecker = ({ context: { user, ctx } }, roles) => {
    console.log('running auth check');
    if (user !== null) {
        return true;
    }
    console.log('still running so user is null');
    return false;
};
let Database = class Database {
    constructor() {
        console.log("Database Construct");
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Database Connect");
            TypeORM.useContainer(typedi_1.Container);
            this.connection = yield TypeORM.createConnection({
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: config_1.DB_CONN.username,
                password: config_1.DB_CONN.password,
                database: config_1.DB_CONN.database,
                entities: [typeorm_1.Catalog, typeorm_1.Agent, typeorm_1.Image, typeorm_1.Type],
                synchronize: true,
            });
            return true;
        });
    }
    getSchema() {
        return __awaiter(this, void 0, void 0, function* () {
            // build TypeGraphQL executable schema
            return yield TypeGraphQL.buildSchema({
                resolvers: [catalog_resolver_1.CatalogResolver],
                authChecker: exports.authChecker,
                container: typedi_1.Container,
            });
        });
    }
};
Database = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], Database);
exports.Database = Database;
//# sourceMappingURL=database.js.map