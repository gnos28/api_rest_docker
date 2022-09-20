import express from "express";
import service from "../services/skillsService";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allSkills = await service.getAll();
    console.log("list all wilders", allSkills);
    res.send(allSkills);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const skill = await service.getById(id);
    console.log("find a skill", skill);
    if (skill.length) return res.send(skill);
    res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  try {
    const payload = req.body;
    const newSkill = await service.create(payload); // si skill name existe déjà renvoyer le skill déjà existant
    return res.status(201).send(newSkill);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10); // si skill name existe déjà renvoyer une erreur
    const payload = req.body;
    const updatedSkill = await service.update(payload, id);
    return res.status(201).send(updatedSkill);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedSkill = await service.delete(id);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;
