import {Entity, Column, PrimaryColumn, OneToMany, CreateDateColumn} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Catalog } from "./catalog";

@ObjectType()
@Entity()
export class Agent {

    @Field(type => ID)
    @PrimaryColumn()
    UUID: string;

    @Field()
    @Column()
    name: string

    @Field()
    @Column()
    email:string

    @Field()
    @Column()
    password: string

    @Field()
    @Column()
    agent_type:number;//1 for regular user, 2 for api credentials maybe

    @Field()
    @Column()
    acl:number;//lets use 1337 for superuser

    @Field()
    @Column()
    enabled:boolean;

    @Field({nullable:true})
    @Column({nullable:true})
    quota:number; //api Requests per X? null denies all api access.

    @Field({nullable:true})
    @Column({nullable:true})
    apikey:string;

    @Field({nullable:true})
    @Column({nullable:true})
    apinumber:number;

    @Field()
    @CreateDateColumn()
    internal_created_at:Date

    @Field({nullable:true})
    @Column({nullable:true})
    internal_last_connect_date:Date;

    @Field({nullable:true})
    @Column({nullable:true})
    internal_last_connect_ip:string;

    @Field(type => [Catalog])
    @OneToMany(type => Catalog, catalog => catalog.internal_created_by)
    @OneToMany(type => Catalog, catalog => catalog.internal_updated_by)
    catalog:Catalog[];
}
