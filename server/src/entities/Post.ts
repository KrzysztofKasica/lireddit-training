import { Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
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
  @Property({type: 'text'})
  title!: string;

  
}
