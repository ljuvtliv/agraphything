import { Resolver, FieldResolver, Root, Query, Arg, Int, ArgsType, Field, Args, Ctx, InputType, Mutation, Authorized } from "type-graphql";
import { Repository, Between } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Catalog, Agent, Type } from "@base/typeorm";
//64a5cb6d-ba5b-55e2-b00f-efbb2be04a3c
import { Context } from "@base/www"
import { Inject } from "typedi";
import { Identification } from "@base/core";

@ArgsType()
class CatalogArgs {
  //First the direct arguments
  @Field({ nullable: true })
  UUID?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  releaseDate?: Date;
}

@ArgsType()
class CatalogsArgs {
  //First the direct arguments
  @Field({ nullable: true })
  UUID?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  releaseDate?: Date;

  //then the virtual arguments
  @Field(type => Int, { nullable: true })
  count?: number;

  @Field(type => Int, { nullable: true })
  skip?: number;

  @Field({ nullable: true })
  sortOrder?: string;

  @Field({ nullable: true })
  sortBy?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;
}

@InputType()
export class CatalogInput {
  @Field()
  name: string;

  @Field()
  description?: string;

  @Field()
  typeUUID: string;

  @Field({ nullable: true })
  releaseDate: Date;
}

@Resolver(of => Catalog)
export class CatalogResolver {

  @Inject()
  private readonly ident: Identification;
  constructor(
    @InjectRepository(Catalog) private readonly catalogRepository: Repository<Catalog>,
    @InjectRepository(Agent) private readonly agentRepository: Repository<Agent>,
    @InjectRepository(Type) private readonly typeRepository: Repository<Type>

  ) { }

  @Authorized()
  @FieldResolver()
  async type(@Root() catalog: Catalog) {
    const type = await this.typeRepository.findOne({ where: { catalog: { UUID: catalog.UUID } } });
    return type;
  }

  @Authorized()
  @Mutation(returns => Catalog)
  async addCatalog(
    @Arg("Catalog") catalogInput: CatalogInput,
    @Ctx() { user }: Context,
  ): Promise<Catalog> {
    let typeid = catalogInput.typeUUID;
    let type = await this.typeRepository.findOne({ where: { UUID: typeid } });
    catalogInput.typeUUID = undefined;
    const catalog = this.catalogRepository.create({
      UUID: this.ident.Get(this.ident.GetNamespace(type.Name), catalogInput.name),
      type: type,
      internal_created_by: user,
      internal_updated_by: user,
      ...catalogInput
    });
    return await this.catalogRepository.save(catalog);
  }

  @Authorized()
  @Query(returns => Catalog, { nullable: true })
  catalog(@Args() arg: CatalogArgs) {
    let find = this._findCatalog(arg);
    console.log('args')
    console.log(find);
    return this.catalogRepository.findOne(find);
  }

  @Authorized()
  @Query(returns => [Catalog])
  catalogs(@Args() arg: CatalogsArgs): Promise<Catalog[]> {
    let find = this._findCatalogs(arg);
    return this.catalogRepository.find(find);
  }

  _findCatalog(arg: CatalogArgs) {
    let find = {
      where: {}
    };
    if (arg.UUID !== undefined) {
      find.where['UUID'] = arg.UUID;
    } if (arg.name !== undefined) {
      find.where['name'] = arg.name;
    } if (arg.releaseDate !== undefined) {
      find.where['releaseDate'] = arg.releaseDate;
    }
    return find;
  }
  _findCatalogs(arg: CatalogsArgs) {
    let find = {
      where: {}
    };
    if (arg.UUID !== undefined) {
      find.where['UUID'] = arg.UUID;
    } if (arg.name !== undefined) {
      find.where['name'] = arg.name;
    } if (arg.releaseDate !== undefined) {
      find.where['releaseDate'] = arg.releaseDate;
    }
    if (arg.count !== undefined) {
      find['take'] = arg.count; //TODO:Limit to max take
    } else {
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
    } if (arg.endDate !== undefined) {
      between.end = arg.endDate;
    }
    if (between.end === undefined && between.start === undefined) {

    } else { //We are doing between
      if (between.end === undefined) {
        between.end = new Date(Date.now());
      } if (between.start === undefined) {
        between.start = new Date(-8640000000000000)
      }
      find.where['releaseDate'] = Between(between.start, between.end);
    }
    return find;
  }
}
