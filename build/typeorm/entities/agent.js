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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const catalog_1 = require("./catalog");
let Agent = class Agent {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Agent.prototype, "UUID", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Agent.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Agent.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Agent.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Agent.prototype, "agent_type", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Agent.prototype, "acl", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Agent.prototype, "enabled", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Agent.prototype, "quota", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Agent.prototype, "apikey", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Agent.prototype, "apinumber", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Agent.prototype, "internal_created_at", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Agent.prototype, "internal_last_connect_date", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Agent.prototype, "internal_last_connect_ip", void 0);
__decorate([
    type_graphql_1.Field(type => [catalog_1.Catalog]),
    typeorm_1.OneToMany(type => catalog_1.Catalog, catalog => catalog.internal_created_by),
    typeorm_1.OneToMany(type => catalog_1.Catalog, catalog => catalog.internal_updated_by),
    __metadata("design:type", Array)
], Agent.prototype, "catalog", void 0);
Agent = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Agent);
exports.Agent = Agent;
//# sourceMappingURL=agent.js.map