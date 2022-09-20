import { Skills } from "../models/Skills";
import dataSource from "../tools/utils";

const repo = dataSource.getRepository(Skills);

const service = {
  getAll: async () => {
    return await repo.find();
  },

  getById: async (id: number) => {
    return await repo.findBy({ id });
  },

  create: async (newSkill: Skills) => {
    return await repo.save(newSkill);
  },

  update: async (updatedSkill: Skills, skillId: number) => {
    const test = await repo.update(skillId, updatedSkill);
    console.log("test", test);
    return await repo.findOneBy({
      id: skillId,
    });
  },

  delete: async (skillId: number) => {
    return await repo.delete(skillId);
  },
};

export default service;
