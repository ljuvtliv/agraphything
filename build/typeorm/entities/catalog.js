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
const type_1 = require("./type");
const image_1 = require("./image");
const agent_1 = require("./agent");
const type_graphql_1 = require("type-graphql");
let Catalog = class Catalog {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Catalog.prototype, "UUID", void 0);
__decorate([
    type_graphql_1.Field(type => type_1.Type),
    typeorm_1.ManyToOne(type => type_1.Type, type => type.catalog),
    __metadata("design:type", type_1.Type)
], Catalog.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Catalog.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Catalog.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(type => [image_1.Image]),
    typeorm_1.OneToMany(type => image_1.Image, ImageStore => ImageStore.catalog),
    __metadata("design:type", Array)
], Catalog.prototype, "ImageStore", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Catalog.prototype, "releaseDate", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Catalog.prototype, "internal_created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Catalog.prototype, "internal_updated_at", void 0);
__decorate([
    typeorm_1.ManyToOne(type => agent_1.Agent, internal_created_by => internal_created_by.catalog),
    __metadata("design:type", agent_1.Agent)
], Catalog.prototype, "internal_created_by", void 0);
__decorate([
    typeorm_1.ManyToOne(type => agent_1.Agent, internal_updated_by => internal_updated_by.catalog),
    __metadata("design:type", agent_1.Agent)
], Catalog.prototype, "internal_updated_by", void 0);
Catalog = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Catalog);
exports.Catalog = Catalog;
//# sourceMappingURL=catalog.js.map