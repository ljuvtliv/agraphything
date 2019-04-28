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
const catalog_1 = require("./catalog");
const type_graphql_1 = require("type-graphql");
let Image = class Image {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Image.prototype, "UUID", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Image.prototype, "hash", void 0);
__decorate([
    typeorm_1.Column("bytea"),
    __metadata("design:type", Buffer)
], Image.prototype, "data", void 0);
__decorate([
    typeorm_1.ManyToOne(type => catalog_1.Catalog, catalog => catalog.ImageStore),
    __metadata("design:type", catalog_1.Catalog)
], Image.prototype, "catalog", void 0);
Image = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Image);
exports.Image = Image;
//# sourceMappingURL=image.js.map