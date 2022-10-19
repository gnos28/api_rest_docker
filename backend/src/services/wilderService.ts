import { Wilder } from "../models/Wilder";
import { Skills } from "../models/Skills";
import { Wilder_Skills } from "../models/Wilder_Skills";
import dataSource from "../tools/utils";
import { Repository, DeleteResult } from "typeorm";
import { BaseSkill, SkilledWilder } from "../interfaces";
import { iSkills } from "../interfaces/InputType";

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
  getById: async (id: number): Promise<SkilledWilder> => {
    return (await rebuildEager(await wilderRepo.findBy({ id })))[0];
  },
  create: async (newWilder: Partial<Omit<Wilder, "id">>): Promise<Wilder> => {
    return await wilderRepo.save(newWilder);
  },
  update: async (
    updatedWilder: Partial<Omit<Wilder, "id">>,
    wilderId: number
  ): Promise<SkilledWilder> => {
    const test = await wilderRepo.update(wilderId, updatedWilder);
    return await service.getById(wilderId);
  },
  delete: async (wilderId: number): Promise<SkilledWilder> => {
    const wilderToDelete = await service.getById(wilderId);
    const skillsToDelete = wilderToDelete.skills;

    await Promise.all(
      skillsToDelete.map((skill: BaseSkill): void => {
        const skillsId = skill.id;
        wilderSkillsRepo.delete({ wilderId, skillsId });
      })
    );

    await wilderRepo.delete(wilderId);
    return wilderToDelete;
  },
  getWilderSkills: async (id: number): Promise<BaseSkill[]> => {
    const wilder: SkilledWilder = await service.getById(id);
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
    const wilderToUpdate: SkilledWilder = await service.getById(wilderId);
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
  updateWilderSkillRating: async (
    wilderId: number,
    skillsId: number,
    rating: number
  ) => {
    const wilderToUpdate: SkilledWilder = await service.getById(wilderId);

    console.log("********** wilderToUpdate", wilderToUpdate);

    const [skillToDelete]: Skills[] = await skillsRepo.findBy({ id: skillsId });

    const [wilderSkill]: Wilder_Skills[] = await wilderSkillsRepo.findBy({
      wilderId,
      skillsId,
    });

    const currentSkillIdList: number[] = wilderToUpdate.skills.map(
      (skill: BaseSkill): number => skill.id
    );
    if (currentSkillIdList.includes(skillToDelete.id)) {
      await wilderSkillsRepo.update(wilderSkill.id, { rating });
      return {
        ...wilderToUpdate,
        skills: wilderToUpdate.skills.map((skill) =>
          skill.id === skillsId ? { ...skill, rating } : skill
        ),
      };
    }
    throw new Error("couldnt find wilder skill");
  },

  // massive add & delete
  // updateWilderSkills: async (wilderId: number, newSkillsRaw: string) => {
  updateWilderSkills: async (wilderId: number, newSkills: iSkills[]) => {
    // const newSkills = JSON.parse(newSkillsRaw) as iSkills[];
    const wilderToUpdate = await service.getById(wilderId);
    const skillList = await skillsRepo.find();

    const actualSkills = wilderToUpdate.skills;

    console.log("skillList", skillList);
    console.log("actualSkills", actualSkills);

    const res = await Promise.all(
      actualSkills.map((skill) => {
        if (!newSkills.map((s) => s.name).includes(skill.name)) {
          console.log("wilderSkillsRepo.delete", skill.name);

          return wilderSkillsRepo.delete({
            wilderId,
            skillsId: skillList.filter((s) => s.name === skill.name)[0].id,
          });
        } else return Promise.resolve();
      })
    );

    console.log("promise res", res);

    const res2 = await Promise.all(
      newSkills.map((skill) => {
        if (!actualSkills.map((s) => s.name).includes(skill.name)) {
          console.log("wilderSkillsRepo.save", skill.name);

          return wilderSkillsRepo.save({
            wilderId,
            skillsId: skillList.filter((s) => s.name === skill.name)[0].id,
          });
        } else return Promise.resolve();
      })
    );

    console.log("promise res2", res2);

    return await service.getById(wilderId);
  },

  deleteWilderSkill: async (wilderId: number, skillsId: number) => {
    const wilderToUpdate: SkilledWilder = await service.getById(wilderId);
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
