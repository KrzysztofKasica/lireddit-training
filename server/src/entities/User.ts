import { Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {
  [OptionalProps]?: 'createdAt' | 'updatedAt';
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({type: Date})
  createdAt = new Date();

  @Field(() => String)
  @Property({type: Date,  onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({type: 'text', unique: true})
  username!: string;

  @Field()
  @Property({type: 'text'})
  password!: string;
  
}
