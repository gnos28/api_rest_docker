import skillService from "../services/skillsService";
import wilderService from "../services/wilderService";

export default {
  Wilders: async () => await wilderService.getAll(),
  Wilder: async (_: any, args: { id: number }) =>
    await wilderService.getById(args.id),

  Skills: async () => await skillService.getAll(),
  Skill: async (_: any, args: { id: number }) =>
    await skillService.getById(args.id),
};
