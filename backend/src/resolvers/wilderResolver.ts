import { Arg, Mutation, Query, Resolver } from "type-graphql";
import wilderService from "../services/wilderService";
import * as obj from "../interfaces/ObjectType";
import * as input from "../interfaces/InputType";

@Resolver(obj.oWilder)
export class WilderResolver {
  @Query(() => [obj.oWilder])
  async Wilders() {
    return await wilderService.getAll();
  }

  @Query(() => obj.oWilder)
  async Wilder(@Arg("id") id: number) {
    return await wilderService.getById(id);
  }

  @Mutation(() => obj.oWilder)
  async createWilder(@Arg("wilder") wilder: input.iWilder) {
    return await wilderService.create(wilder);
  }

  @Mutation(() => obj.oWilder)
  async updateWilder(
    @Arg("wilder") wilder: input.iWilder,
    @Arg("wilderId") wilderId: number
  ) {
    return await wilderService.update(wilder, wilderId);
  }

  @Mutation(() => obj.oWilder)
  async deleteWilder(@Arg("wilderId") wilderId: number) {
    return await wilderService.delete(wilderId);
  }

  @Mutation(() => obj.oWilder)
  async addWilderSkill(
    @Arg("wilderId") wilderId: number,
    @Arg("skillsId") skillsId: number
  ) {
    return await wilderService.addWilderSkill(wilderId, skillsId);
  }

  @Mutation(() => obj.oWilder)
  async updateWilderSkill(
    @Arg("wilderId") wilderId: number,
    @Arg("skillsId") skillsId: number,
    @Arg("rating") rating: number
  ) {
    return await wilderService.updateWilderSkill(wilderId, skillsId, rating);
  }

  @Mutation(() => obj.oWilder)
  async deleteWilderSkill(
    @Arg("wilderId") wilderId: number,
    @Arg("skillsId") skillsId: number
  ) {
    return await wilderService.deleteWilderSkill(wilderId, skillsId);
  }
}
