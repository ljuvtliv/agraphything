import {Entity, Column, PrimaryColumn, OneToMany} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

import { Catalog } from "./catalog";

@ObjectType()
@Entity()
export class Type {

    @Field(type => ID)
    @PrimaryColumn()
    UUID: string;

    @Field(type => [Catalog])
    @OneToMany(type => Catalog, catalog => catalog.type)
    catalog:Catalog[];

    @Field()
    @Column()
    Name: string;
    @Field()
    @Column()
    Description: string;

}
