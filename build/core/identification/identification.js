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
const typedi_1 = require("typedi");
const v5 = require("uuid/v5");
let Identification = class Identification {
    constructor() {
        this.rootUUID = "00000000-0000-0000-0000-000000000000";
        this.SaltKey = "changeme";
    }
    getSalt() {
        return this.SaltKey;
    }
    hashWithSalt(value) {
    }
    GetNamespace(name) {
        return v5(name, this.rootUUID);
    }
    Get(namespace, name) {
        return v5(name, namespace);
    }
};
Identification = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], Identification);
exports.Identification = Identification;
//# sourceMappingURL=identification.js.map