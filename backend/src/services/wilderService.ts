import { Wilder } from "../models/Wilder";
import { Skills } from "../models/Skills";
import { Wilder_Skills } from "../models/Wilder_Skills";
import dataSource from "../tools/utils";

const wilderRepo = dataSource.getRepository(Wilder);
const skillsRepo = dataSource.getRepository(Skills);
const wilderSkillsRepo = dataSource.getRepository(Wilder_Skills);

const rebuildEager = async (wilders: Wilder[]) => {
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

const service = {
  getAll: async () => {
    return rebuildEager(await wilderRepo.find());
  },
  getById: async (id: number) => {
    return rebuildEager(await wilderRepo.findBy({ id }));
  },
  create: async (newWilder: Wilder) => {
    return await wilderRepo.save(newWilder);
  },
  update: async (updatedWilder: Wilder, wilderId: number) => {
    const test = await wilderRepo.update(wilderId, updatedWilder);
    console.log("test", test);
    return await service.getById(wilderId);
  },
  delete: async (wilderId: number) => {
    const [wilderToDelete] = await service.getById(wilderId);
    const skillsToDelete = wilderToDelete.skills;

    await Promise.all(
      skillsToDelete.map((skill) => {
        const skillsId = skill.id;
        wilderSkillsRepo.delete({ wilderId, skillsId });
      })
    );

    return await wilderRepo.delete(wilderId);
  },
  getWilderSkills: async (id: number) => {
    const [wilder] = await service.getById(id);
    return wilder.skills;
  },
  addWilderSkill: async (wilderId: number, skillsId: number) => {
    const [wilderToUpdate] = await service.getById(wilderId);
    const [skillToAdd] = await skillsRepo.findBy({ id: skillsId });

    // vérifier si skill déjà présent
    const currentSkillIdList = wilderToUpdate.skills.map((skill) => skill.id);
    if (!currentSkillIdList.includes(skillToAdd.id)) {
      return await wilderSkillsRepo.save({ wilderId, skillsId });
    }
    throw new Error("skill already affected to wilder");
  },
  updateWilderSkill: async (
    wilderId: number,
    skillsId: number,
    rating: number
  ) => {
    const [wilderToUpdate] = await service.getById(wilderId);
    const [skillToDelete] = await skillsRepo.findBy({ id: skillsId });

    const [wilderSkill] = await wilderSkillsRepo.findBy({ wilderId, skillsId });
    console.log("wilderSkill", wilderSkill);

    const currentSkillIdList = wilderToUpdate.skills.map((skill) => skill.id);
    if (currentSkillIdList.includes(skillToDelete.id)) {
      return await wilderSkillsRepo.update(wilderSkill.id, { rating });
    }
    throw new Error("couldnt find wilder skill");
  },
  deleteWilderSkill: async (wilderId: number, skillsId: number) => {
    const [wilderToUpdate] = await service.getById(wilderId);
    const [skillToDelete] = await skillsRepo.findBy({ id: skillsId });

    // vérifier si skill déjà présent
    const currentSkillIdList = wilderToUpdate.skills.map((skill) => skill.id);
    if (currentSkillIdList.includes(skillToDelete.id)) {
      await wilderSkillsRepo.delete({ wilderId, skillsId });
    }
    return;
  },
};

export default service;
