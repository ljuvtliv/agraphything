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
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const core_1 = require("@base/core");
const typeorm_2 = require("@base/typeorm");
let TypeSeed = class TypeSeed {
    seed() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log();
            const sw = new typeorm_2.Type();
            sw.Name = "switch";
            sw.Description = "A Switchy Switch";
            sw.UUID = this.ident.GetNamespace(sw.Name);
            yield this.connection.manager.save(sw);
            const wii = new typeorm_2.Type();
            wii.Name = "wii";
            wii.Description = "A wiiitchy wiii";
            wii.UUID = this.ident.GetNamespace(wii.Name);
            yield this.connection.manager.save(wii);
            //see types
        });
    }
};
__decorate([
    typeorm_typedi_extensions_1.InjectConnection(),
    __metadata("design:type", typeorm_1.Connection)
], TypeSeed.prototype, "connection", void 0);
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", core_1.Identification)
], TypeSeed.prototype, "ident", void 0);
TypeSeed = __decorate([
    typedi_1.Service()
], TypeSeed);
exports.TypeSeed = TypeSeed;
//# sourceMappingURL=type.js.map