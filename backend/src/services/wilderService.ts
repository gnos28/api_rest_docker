import { Wilder } from "../models/Wilder";
import { Skills } from "../models/Skills";
import { Wilder_Skills } from "../models/Wilder_Skills";
import dataSource from "../tools/utils";
import { Repository, DeleteResult } from "typeorm";

type BaseSkill = {
  rating: number;
  id: number;
  name: string;
};

type SkilledWilder = {
  skills: BaseSkill[];
  id: number;
  name: string;
  description: string;
  wilderSkills: Wilder_Skills[];
};

const wilderRepo: Repository<Wilder> = dataSource.getRepository(Wilder);
const skillsRepo: Repository<Skills> = dataSource.getRepository(Skills);
const wilderSkillsRepo: Repository<Wilder_Skills> =
  dataSource.getRepository(Wilder_Skills);

const rebuildEager = async (wilders: Wilder[]): Promise<SkilledWilder[]> => {
  const wilderSkills: Wilder_Skills[] = await wilderSkillsRepo.find();
  const skills: Skills[] = await skillsRepo.find();

  return wilders.map(
    (wilder: Wilder): SkilledWilder => ({
      ...wilder,
      skills: wilderSkills
        .filter((ws: Wilder_Skills): boolean => ws.wilderId === wilder.id)
        .map(
          (ws: Wilder_Skills): BaseSkill => ({
            rating: ws.rating,
            id: skills.filter(
              (skill: Skills): boolean => skill.id === ws.skillsId
            )[0].id,
            name: skills.filter(
              (skill: Skills): boolean => skill.id === ws.skillsId
            )[0].name,
          })
        ),
    })
  );
};

const service = {
  getAll: async (): Promise<SkilledWilder[]> => {
    return rebuildEager(await wilderRepo.find());
  },
  getById: async (id: number): Promise<SkilledWilder[]> => {
    return rebuildEager(await wilderRepo.findBy({ id }));
  },
  create: async (newWilder: Wilder): Promise<Wilder> => {
    return await wilderRepo.save(newWilder);
  },
  update: async (
    updatedWilder: Wilder,
    wilderId: number
  ): Promise<SkilledWilder[]> => {
    const test = await wilderRepo.update(wilderId, updatedWilder);
    return await service.getById(wilderId);
  },
  delete: async (wilderId: number): Promise<DeleteResult> => {
    const [wilderToDelete] = await service.getById(wilderId);
    const skillsToDelete = wilderToDelete.skills;

    await Promise.all(
      skillsToDelete.map((skill: BaseSkill): void => {
        const skillsId = skill.id;
        wilderSkillsRepo.delete({ wilderId, skillsId });
      })
    );

    return await wilderRepo.delete(wilderId);
  },
  getWilderSkills: async (id: number): Promise<BaseSkill[]> => {
    const [wilder]: SkilledWilder[] = await service.getById(id);
    return wilder.skills;
  },
  addWilderSkill: async (
    wilderId: number,
    skillsId: number
  ): Promise<
    {
      wilderId: number;
      skillsId: number;
    } & Wilder_Skills
  > => {
    const [wilderToUpdate]: SkilledWilder[] = await service.getById(wilderId);
    const [skillToAdd]: Skills[] = await skillsRepo.findBy({ id: skillsId });

    // vérifier si skill déjà présent
    const currentSkillIdList: number[] = wilderToUpdate.skills.map(
      (skill: BaseSkill): number => skill.id
    );
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
    const [wilderToUpdate]: SkilledWilder[] = await service.getById(wilderId);
    const [skillToDelete]: Skills[] = await skillsRepo.findBy({ id: skillsId });

    const [wilderSkill]: Wilder_Skills[] = await wilderSkillsRepo.findBy({
      wilderId,
      skillsId,
    });

    const currentSkillIdList: number[] = wilderToUpdate.skills.map(
      (skill: BaseSkill): number => skill.id
    );
    if (currentSkillIdList.includes(skillToDelete.id)) {
      return await wilderSkillsRepo.update(wilderSkill.id, { rating });
    }
    throw new Error("couldnt find wilder skill");
  },
  deleteWilderSkill: async (wilderId: number, skillsId: number) => {
    const [wilderToUpdate]: SkilledWilder[] = await service.getById(wilderId);
    const [skillToDelete]: Skills[] = await skillsRepo.findBy({ id: skillsId });

    // vérifier si skill déjà présent
    const currentSkillIdList: number[] = wilderToUpdate.skills.map(
      (skill: BaseSkill): number => skill.id
    );
    if (currentSkillIdList.includes(skillToDelete.id)) {
      await wilderSkillsRepo.delete({ wilderId, skillsId });
    }
    return;
  },
};

export default service;
