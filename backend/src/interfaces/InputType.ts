import { Field, InputType, ID } from "type-graphql";

@InputType()
export class iWilder {
  @Field()
  name?: string;

  @Field()
  description?: string;
}

@InputType()
export class iSkills {
  @Field()
  name: string;
}
