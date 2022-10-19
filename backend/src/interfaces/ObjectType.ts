import { Field, ObjectType, ID, Int } from "type-graphql";

@ObjectType()
export class oWilder {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => [oSkills], { nullable: true })
  skills: oSkills[];
}

@ObjectType()
export class oSkills {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  rating: number;
}
