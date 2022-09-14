const Wilder = require("../models/Wilder");
const Skills = require("../models/Skills");
const dataSource = require("../tools/utils");

const wilderRepo = dataSource.getRepository(Wilder);
const skillsRepo = dataSource.getRepository(Skills);

const service = {
  getAll: async () => {
    return await wilderRepo.find();
  },

  getById: async (id) => {
    return await wilderRepo.findBy({ id });
  },

  create: async (newWilder) => {
    return await wilderRepo.save(newWilder);
  },

  update: async (updatedWilder, wilderId) => {
    const test = await wilderRepo.update(wilderId, updatedWilder);
    console.log("test", test);
    return await wilderRepo.findOneBy({
      id: parseInt(wilderId),
    });
  },

  delete: async (wilderId) => {
    return await wilderRepo.delete(wilderId);
  },

  getWilderSkills: async (id) => {
    const [wilder] = await wilderRepo.findBy({ id });
    return wilder.skills;
  },

  addWilderSkill: async (wilderId, skillId) => {
    const [wilderToUpdate] = await wilderRepo.findBy({ id: wilderId });
    const [skillToAdd] = await skillsRepo.findBy({ id: skillId });

    console.log("wilderToUpdate", wilderToUpdate);
    console.log("skillToAdd", skillToAdd);

    // vérifier si skill déjà présent
    const currentSkillIdList = wilderToUpdate.skills.map((skill) => skill.id);
    if (!currentSkillIdList.includes(skillToAdd.id)) {
      wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];
      const answer = await wilderRepo.save(wilderToUpdate);
      console.log("answer", answer);
      return answer;
    }
    throw new Error("skill already affected to wilder");
  },

  deleteWilderSkill: async (wilderId, skillId) => {
    const [wilderToUpdate] = await wilderRepo.findBy({ id: wilderId });
    const [skillToDelete] = await skillsRepo.findBy({ id: skillId });

    console.log("wilderToUpdate", wilderToUpdate);
    console.log("skillToDelete", skillToDelete);

    // vérifier si skill déjà présent
    const currentSkillIdList = wilderToUpdate.skills.map((skill) => skill.id);
    if (currentSkillIdList.includes(skillToDelete.id)) {
      wilderToUpdate.skills = wilderToUpdate.skills.filter(
        (skill) => skill.id !== skillToDelete.id
      );
      await wilderRepo.save(wilderToUpdate);
    }
    return;
    // throw new Error("wilder don't have this skill");
  },
};

module.exports = service;
