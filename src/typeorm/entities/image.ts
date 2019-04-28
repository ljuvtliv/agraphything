import {Entity, Column, PrimaryColumn, ManyToOne} from "typeorm";
import { Catalog } from "./catalog";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Image {

    @Field(type=>ID)
    @PrimaryColumn()
    UUID: string;

    @Field()
    @Column()
    hash: string;

    @Column("bytea")
    data: Buffer;

    @ManyToOne(type => Catalog, catalog => catalog.ImageStore)
    catalog: Catalog;
}
