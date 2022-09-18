const Wilder = require("../models/Wilder");
const Skills = require("../models/Skills");
const WilderSkills = require("../models/Wilder_Skills");
const dataSource = require("../tools/utils");

const wilderRepo = dataSource.getRepository(Wilder);
const skillsRepo = dataSource.getRepository(Skills);
const wilderSkillsRepo = dataSource.getRepository(WilderSkills);

const rebuildEager = async (wilders) => {
  const wilderSkills = await wilderSkillsRepo.find();
  const skills = await skillsRepo.find();

  return wilders.map((wilder) => ({
    ...wilder,
    skills: wilderSkills
      .filter((ws) => ws.wilderId === wilder.id)
      .map((ws) => ({
        rating: ws.rating,
        id: skills.filter((skill) => skill.id === ws.skillsId)[0].id,
        name: skills.filter((skill) => skill.id === ws.skillsId)[0].name,
      })),
  }));
};

const service = {};
service.getAll = async () => {
  return rebuildEager(await wilderRepo.find());
};

service.getById = async (id) => {
  return rebuildEager(await wilderRepo.findBy({ id }));
};

service.create = async (newWilder) => {
  return await wilderRepo.save(newWilder);
};

service.update = async (updatedWilder, wilderId) => {
  const test = await wilderRepo.update(wilderId, updatedWilder);
  console.log("test", test);
  return await service.getById(parseInt(wilderId));
};

service.delete = async (wilderId) => {
  const [wilderToDelete] = await service.getById(wilderId);
  const skillsToDelete = wilderToDelete.skills;

  await Promise.all(
    skillsToDelete.map((skill) => {
      const skillsId = skill.id;
      wilderSkillsRepo.delete({ wilderId, skillsId });
    })
  );

  return await wilderRepo.delete(wilderId);
};

service.getWilderSkills = async (id) => {
  const [wilder] = await service.getById(id);
  return wilder.skills;
};

service.addWilderSkill = async (wilderId, skillsId) => {
  const [wilderToUpdate] = await service.getById(wilderId);
  const [skillToAdd] = await skillsRepo.findBy({ id: skillsId });

  // vérifier si skill déjà présent
  const currentSkillIdList = wilderToUpdate.skills.map((skill) => skill.id);
  if (!currentSkillIdList.includes(skillToAdd.id)) {
    return await wilderSkillsRepo.save({ wilderId, skillsId });
  }
  throw new Error("skill already affected to wilder");
};

service.updateWilderSkill = async (wilderId, skillsId, rating) => {
  const [wilderToUpdate] = await service.getById(wilderId);
  const [skillToDelete] = await skillsRepo.findBy({ id: skillsId });

  const [wilderSkill] = await wilderSkillsRepo.findBy({ wilderId, skillsId });
  console.log("wilderSkill", wilderSkill);

  const currentSkillIdList = wilderToUpdate.skills.map((skill) => skill.id);
  if (currentSkillIdList.includes(skillToDelete.id)) {
    return await wilderSkillsRepo.update(wilderSkill.id, { rating });
  }
  throw new Error("couldnt find wilder skill");
};

service.deleteWilderSkill = async (wilderId, skillsId) => {
  const [wilderToUpdate] = await service.getById(wilderId);
  const [skillToDelete] = await skillsRepo.findBy({ id: skillsId });

  // vérifier si skill déjà présent
  const currentSkillIdList = wilderToUpdate.skills.map((skill) => skill.id);
  if (currentSkillIdList.includes(skillToDelete.id)) {
    await wilderSkillsRepo.delete({ wilderId, skillsId });
  }
  return;
};

module.exports = service;
