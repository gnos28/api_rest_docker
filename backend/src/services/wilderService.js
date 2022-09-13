const Wilder = require("../models/Wilder");
const dataSource = require("../tools/utils");

const repo = dataSource.getRepository(Wilder);

const service = {
  getAll: async () => {
    return await repo.find();
  },

  getById: async (id) => {
    return await repo.findBy({ id });
  },

  create: async (newWilder) => {
    return await repo.save(newWilder);
  },

  update: async (updatedWilder, wilderId) => {
    const test = await repo.update(wilderId, updatedWilder);
    console.log("test", test);
    return await repo.findOneBy({
      id: parseInt(wilderId),
    });
  },

  delete: async (wilderId) => {
    return await repo.delete(wilderId);
  },
};

module.exports = service;
