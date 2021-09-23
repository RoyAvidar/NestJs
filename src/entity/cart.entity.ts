import { ObjectType } from "@nestjs/graphql";
import { Entity } from "typeorm";

@Entity('categories')
@ObjectType()
export class Cart {}