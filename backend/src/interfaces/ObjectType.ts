import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
export class oWilder {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => [oSkills])
  skills: oSkills[];
}

@ObjectType()
export class oSkills {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  rating: string;
}
