import express, { Router, Request, Response } from "express";
import service from "../services/skillsService";
import { Skills } from "../models/Skills";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const allSkills: Skills[] = await service.getAll();
    res.send(allSkills);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const skill: Skills[] = await service.getById(id);
    if (skill.length) return res.send(skill);
    res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const payload: Skills = req.body;
    const newSkill: Skills = await service.create(payload); // si skill name existe déjà renvoyer le skill déjà existant
    return res.status(201).send(newSkill);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10); // si skill name existe déjà renvoyer une erreur
    const payload: Skills = req.body;
    const updatedSkill: Skills | null = await service.update(payload, id);
    return res.status(201).send(updatedSkill);
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

export default router;
