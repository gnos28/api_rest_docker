import { Field, InputType } from "type-graphql";

@InputType()
export class iWilder {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;
}

@InputType()
export class iSkills {
  @Field()
  name: string;
}
