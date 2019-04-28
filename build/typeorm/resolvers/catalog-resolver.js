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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const typeorm_2 = require("@base/typeorm");
const typedi_1 = require("typedi");
const core_1 = require("@base/core");
let CatalogArgs = class CatalogArgs {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CatalogArgs.prototype, "UUID", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CatalogArgs.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], CatalogArgs.prototype, "releaseDate", void 0);
CatalogArgs = __decorate([
    type_graphql_1.ArgsType()
], CatalogArgs);
let CatalogsArgs = class CatalogsArgs {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CatalogsArgs.prototype, "UUID", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CatalogsArgs.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], CatalogsArgs.prototype, "releaseDate", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CatalogsArgs.prototype, "count", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CatalogsArgs.prototype, "skip", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CatalogsArgs.prototype, "sortOrder", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CatalogsArgs.prototype, "sortBy", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], CatalogsArgs.prototype, "startDate", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], CatalogsArgs.prototype, "endDate", void 0);
CatalogsArgs = __decorate([
    type_graphql_1.ArgsType()
], CatalogsArgs);
let CatalogInput = class CatalogInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CatalogInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CatalogInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CatalogInput.prototype, "typeUUID", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], CatalogInput.prototype, "releaseDate", void 0);
CatalogInput = __decorate([
    type_graphql_1.InputType()
], CatalogInput);
exports.CatalogInput = CatalogInput;
let CatalogResolver = class CatalogResolver {
    constructor(catalogRepository, agentRepository, typeRepository) {
        this.catalogRepository = catalogRepository;
        this.agentRepository = agentRepository;
        this.typeRepository = typeRepository;
    }
    type(catalog) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = yield this.typeRepository.findOne({ where: { catalog: { UUID: catalog.UUID } } });
            return type;
        });
    }
    addCatalog(catalogInput, { user }) {
        return __awaiter(this, void 0, void 0, function* () {
            let typeid = catalogInput.typeUUID;
            let type = yield this.typeRepository.findOne({ where: { UUID: typeid } });
            catalogInput.typeUUID = undefined;
            const catalog = this.catalogRepository.create(Object.assign({ UUID: this.ident.Get(this.ident.GetNamespace(type.Name), catalogInput.name), type: type, internal_created_by: user, internal_updated_by: user }, catalogInput));
            return yield this.catalogRepository.save(catalog);
        });
    }
    catalog(arg) {
        let find = this._findCatalog(arg);
        console.log('args');
        console.log(find);
        return this.catalogRepository.findOne(find);
    }
    catalogs(arg) {
        let find = this._findCatalogs(arg);
        return this.catalogRepository.find(find);
    }
    _findCatalog(arg) {
        let find = {
            where: {}
        };
        if (arg.UUID !== undefined) {
            find.where['UUID'] = arg.UUID;
        }
        if (arg.name !== undefined) {
            find.where['name'] = arg.name;
        }
        if (arg.releaseDate !== undefined) {
            find.where['releaseDate'] = arg.releaseDate;
        }
        return find;
    }
    _findCatalogs(arg) {
        let find = {
            where: {}
        };
        if (arg.UUID !== undefined) {
            find.where['UUID'] = arg.UUID;
        }
        if (arg.name !== undefined) {
            find.where['name'] = arg.name;
        }
        if (arg.releaseDate !== undefined) {
            find.where['releaseDate'] = arg.releaseDate;
        }
        if (arg.count !== undefined) {
            find['take'] = arg.count; //TODO:Limit to max take
        }
        else {
            find['take'] = 20;
        }
        if (arg.skip !== undefined) {
            find['skip'] = arg.skip;
        }
        if (arg.sortBy !== undefined) {
            let order = "ASC";
            if (arg.sortOrder !== undefined) {
                order = arg.sortOrder;
            }
            find['order'] = {};
            find['order'][arg.sortBy] = order;
        }
        if (arg.sortOrder !== undefined) { }
        let between = { start: undefined, end: undefined };
        if (arg.startDate !== undefined) {
            between.start = arg.startDate;
        }
        if (arg.endDate !== undefined) {
            between.end = arg.endDate;
        }
        if (between.end === undefined && between.start === undefined) {
        }
        else { //We are doing between
            if (between.end === undefined) {
                between.end = new Date(Date.now());
            }
            if (between.start === undefined) {
                between.start = new Date(-8640000000000000);
            }
            find.where['releaseDate'] = typeorm_1.Between(between.start, between.end);
        }
        return find;
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", core_1.Identification)
], CatalogResolver.prototype, "ident", void 0);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_2.Catalog]),
    __metadata("design:returntype", Promise)
], CatalogResolver.prototype, "type", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(returns => typeorm_2.Catalog),
    __param(0, type_graphql_1.Arg("Catalog")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CatalogInput, Object]),
    __metadata("design:returntype", Promise)
], CatalogResolver.prototype, "addCatalog", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Query(returns => typeorm_2.Catalog, { nullable: true }),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CatalogArgs]),
    __metadata("design:returntype", void 0)
], CatalogResolver.prototype, "catalog", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Query(returns => [typeorm_2.Catalog]),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CatalogsArgs]),
    __metadata("design:returntype", Promise)
], CatalogResolver.prototype, "catalogs", null);
CatalogResolver = __decorate([
    type_graphql_1.Resolver(of => typeorm_2.Catalog),
    __param(0, typeorm_typedi_extensions_1.InjectRepository(typeorm_2.Catalog)),
    __param(1, typeorm_typedi_extensions_1.InjectRepository(typeorm_2.Agent)),
    __param(2, typeorm_typedi_extensions_1.InjectRepository(typeorm_2.Type)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], CatalogResolver);
exports.CatalogResolver = CatalogResolver;
//# sourceMappingURL=catalog-resolver.js.map