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
const Koa = require("koa");
const apollo_server_koa_1 = require("apollo-server-koa");
const router_1 = require("./router");
const typeorm_1 = require("@base/typeorm");
const core_1 = require("@base/core");
let Web = class Web {
    constructor() {
        this.koa = new Koa();
        this.router = router_1.router;
        this.koa.use(this.router.routes()).use(this.router.allowedMethods());
        this.port = 4050;
    }
    bootGraphQL() {
        return __awaiter(this, void 0, void 0, function* () {
            let schema = yield this.database.getSchema();
            let app = this.koa;
            let db = this.database;
            let context = function ({ user, ctx }) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log('context');
                    // get the user token from the headers
                    const token = ctx.request.headers['x-auth'] || '';
                    // try to retrieve a user with the token
                    let agent = yield db.connection.getRepository(typeorm_1.Agent).findOne({ where: { apikey: token } });
                    if (agent === undefined) {
                        return { user: null, ctx };
                    }
                    ;
                    // add the user to the context
                    return { user: agent, ctx: ctx };
                });
            };
            this.apolloServer = new apollo_server_koa_1.ApolloServer({
                schema,
                context: context,
            });
            this.apolloServer.applyMiddleware({ app });
        });
    }
    serve() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bootGraphQL();
            this.koa.listen({ port: this.port }, () => console.log(`🚀 Server ready at http://localhost:` + this.port + `${this.apolloServer.graphqlPath}`));
            console.log('readyforbissniss v2');
        });
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", typeorm_1.Database)
], Web.prototype, "database", void 0);
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", core_1.Identification)
], Web.prototype, "ident", void 0);
Web = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], Web);
exports.Web = Web;
//# sourceMappingURL=web.js.map