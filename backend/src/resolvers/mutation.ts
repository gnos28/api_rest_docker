import skillService from "../services/skillsService";
import wilderService from "../services/wilderService";

export default {
  createSkill: async (_: any, args: any) => {
    return await skillService.create(args.name);
  },
  updateSkill: async (_: any, args: any) => {
    return await skillService.update(args.skill, args.skillId);
  },
  deleteSkill: async (_: any, args: any) => {
    return await skillService.delete(args.skillId);
  },
  createWilder: async (_: any, args: any) => {
    return await wilderService.create(args);
  },
  updateWilder: async (_: any, args: any) => {
    return await wilderService.update(args.wilder, args.wilderId);
  },
  deleteWilder: async (_: any, args: any) => {
    return await wilderService.delete(args.wilderId);
  },
  addWilderSkill: async (_: any, args: any) => {
    return await wilderService.addWilderSkill(args.wilderId, args.skillsId);
  },
  updateWilderSkill: async (_: any, args: any) => {
    return await wilderService.updateWilderSkill(
      args.wilderId,
      args.skillsId,
      args.rating
    );
  },
  deleteWilderSkill: async (_: any, args: any) => {
    return await wilderService.deleteWilderSkill(args.wilderId, args.skillsId);
  },
};
