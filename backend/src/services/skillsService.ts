import { Repository, DeleteResult } from "typeorm";
import { Skills } from "../models/Skills";
import dataSource from "../tools/utils";

const repo: Repository<Skills> = dataSource.getRepository(Skills);

const service = {
  getAll: async (): Promise<Skills[]> => {
    return await repo.find();
  },

  getById: async (id: number): Promise<Skills[]> => {
    return await repo.findBy({ id });
  },

  create: async (newSkill: Skills): Promise<Skills> => {
    return await repo.save(newSkill);
  },

  update: async (
    updatedSkill: Skills,
    skillId: number
  ): Promise<Skills | null> => {
    await repo.update(skillId, updatedSkill);
    return await repo.findOneBy({
      id: skillId,
    });
  },

  delete: async (skillId: number): Promise<DeleteResult> => {
    return await repo.delete(skillId);
  },
};

export default service;
