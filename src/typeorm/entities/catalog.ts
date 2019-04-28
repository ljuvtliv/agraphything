import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Type } from "./type";
import { Image } from "./image";
import { Agent } from "./agent";

import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Catalog {

  @Field(type => ID)
  @PrimaryColumn()
  UUID: string;

  @Field(type => Type)
  @ManyToOne(type => Type, type => type.catalog)
  type: Type;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(type => [Image])
  @OneToMany(type => Image, ImageStore => ImageStore.catalog)
  ImageStore: Image[];

  @Field()
  @Column({ nullable: true })
  releaseDate: Date;

  @CreateDateColumn()
  internal_created_at: Date
  @UpdateDateColumn()
  internal_updated_at: Date

  @ManyToOne(type => Agent, internal_created_by => internal_created_by.catalog)
  internal_created_by: Agent
  @ManyToOne(type => Agent, internal_updated_by => internal_updated_by.catalog)
  internal_updated_by: Agent
}
