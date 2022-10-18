import express, { Router, Request, Response } from "express";
import service from "../services/wilderService";
import { Skills } from "../models/Skills";
import { Wilder_Skills } from "../models/Wilder_Skills";
import { Wilder } from "../models/Wilder";
import { BaseSkill, SkilledWilder } from "../interfaces";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const allWilders: SkilledWilder[] = await service.getAll();
    console.log("list all wilders", allWilders);
    res.send(allWilders);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const wilder: SkilledWilder = await service.getById(id);
    if (wilder) return res.send(wilder);
    res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const payload: Wilder = req.body;
    const newWilder: Wilder = await service.create(payload);
    return res.status(201).send(newWilder);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const payload: Wilder = req.body;
    const updatedWilder: SkilledWilder = await service.update(payload, id);
    return res.status(201).send(updatedWilder);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await service.delete(id);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// ************* SKILLS *************

// get skills of a wilder
router.get("/:id/skills", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const skills: BaseSkill[] = await service.getWilderSkills(id);
    if (skills) return res.send(skills);
    res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// add skill to a wilder
router.post("/:id/skills/:skillId", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const skillId: number = parseInt(req.params.skillId, 10);
    const result: {
      wilderId: number;
      skillsId: number;
    } & Wilder_Skills = await service.addWilderSkill(id, skillId);
    res.status(201).send(result);
    // res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// update skill rating
router.put("/:id/skills/:skillId", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const skillId: number = parseInt(req.params.skillId, 10);
    const { rating }: { rating: number } = req.body;
    const result = await service.updateWilderSkill(id, skillId, rating);
    res.status(201).send(result);
    // res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// update multiple skills
router.put("/:id/skills", async (req: Request, res: Response) => {
  try {
    const wilderId: number = parseInt(req.params.id, 10);
    const newSkills: Skills[] = req.body.skills;

    const currentSkills: BaseSkill[] = await service.getWilderSkills(wilderId);

    const skillsToAdd: Skills[] = newSkills.filter(
      (newSkill: Skills): boolean =>
        !currentSkills
          .map((skill: BaseSkill): number => skill.id)
          .includes(newSkill.id)
    );

    const skillsToRemove = currentSkills.filter(
      (currentSkill: BaseSkill): boolean =>
        !newSkills.map((skill: Skills) => skill.id).includes(currentSkill.id)
    );

    await Promise.all([
      ...skillsToAdd.map(
        (
          skill: Skills
        ): Promise<
          {
            wilderId: number;
            skillsId: number;
          } & Wilder_Skills
        > => service.addWilderSkill(wilderId, skill.id)
      ),
      ...skillsToRemove.map(
        (skill: BaseSkill): Promise<void> =>
          service.deleteWilderSkill(wilderId, skill.id)
      ),
    ]);

    res.status(201).send(newSkills);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// remove skill to a wilder
router.delete("/:id/skills/:skillId", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const skillId: number = parseInt(req.params.skillId, 10);
    await service.deleteWilderSkill(id, skillId);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;
