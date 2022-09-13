const Skills = require("../models/Skills");
const dataSource = require("../tools/utils");

const repo = dataSource.getRepository(Skills);

const service = {
  getAll: async () => {
    return await repo.find();
  },

  getById: async (id) => {
    return await repo.findBy({ id });
  },

  create: async (newSkill) => {
    return await repo.save(newSkill);
  },

  update: async (updatedSkill, skillId) => {
    const test = await repo.update(skillId, updatedSkill);
    console.log("test", test);
    return await repo.findOneBy({
      id: parseInt(skillId),
    });
  },

  delete: async (skillId) => {
    return await repo.delete(skillId);
  },
};

module.exports = service;
