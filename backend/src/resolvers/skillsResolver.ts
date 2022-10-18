import { Mutation, Query, Resolver, Arg } from "type-graphql";
import skillsService from "../services/skillsService";
import * as obj from "../interfaces/ObjectType";
import * as input from "../interfaces/InputType";

@Resolver(obj.oSkills)
export class SkillsResolver {
  @Query(() => [obj.oSkills])
  async Skills() {
    return await skillsService.getAll();
  }

  @Query(() => obj.oSkills)
  async Skill(@Arg("id") id: number) {
    return await skillsService.getById(id);
  }

  @Mutation(() => obj.oSkills)
  async createSkill(@Arg("Skills") Skills: input.iSkills) {
    return await skillsService.create(Skills);
  }

  @Mutation(() => obj.oSkills)
  async updateSkill(
    @Arg("Skills") Skills: input.iSkills,
    @Arg("SkillsId") SkillsId: number
  ) {
    return await skillsService.update(Skills, SkillsId);
  }

  @Mutation(() => obj.oSkills)
  async deleteSkill(@Arg("SkillsId") SkillsId: number) {
    return await skillsService.delete(SkillsId);
  }
}
