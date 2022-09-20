import express from "express";
import service from "../services/wilderService";
import { Skills } from "../models/Skills";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allWilders = await service.getAll();
    console.log("list all wilders", allWilders);
    res.send(allWilders);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const wilder = await service.getById(id);
    console.log("find a wilder", wilder);
    if (wilder.length) return res.send(wilder);
    res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  try {
    const payload = req.body;
    const newWilder = await service.create(payload);
    return res.status(201).send(newWilder);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const payload = req.body;
    const updatedWilder = await service.update(payload, id);
    return res.status(201).send(updatedWilder);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await service.delete(id);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// ************* SKILLS *************

// get skills of a wilder
router.get("/:id/skills", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const skills = await service.getWilderSkills(id);
    console.log("skills", skills);
    if (skills) return res.send(skills);
    res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// add skill to a wilder
router.post("/:id/skills/:skillId", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const skillId = parseInt(req.params.skillId, 10);
    const result = await service.addWilderSkill(id, skillId);
    res.status(201).send(result);
    // res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// update skill rating
router.put("/:id/skills/:skillId", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const skillId = parseInt(req.params.skillId, 10);
    const { rating } = req.body;
    const result = await service.updateWilderSkill(id, skillId, rating);
    res.status(201).send(result);
    // res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// update multiple skills
router.put("/:id/skills", async (req, res) => {
  try {
    const wilderId = parseInt(req.params.id, 10);
    const newSkills: Skills[] = req.body.skills;

    const currentSkills = await service.getWilderSkills(wilderId);

    // console.log("newSkills", newSkills);
    // console.log("currentSkills", currentSkills);

    const skillsToAdd = newSkills.filter(
      (newSkill) =>
        !currentSkills.map((skill) => skill.id).includes(newSkill.id)
    );

    const skillsToRemove = currentSkills.filter(
      (currentSkill) =>
        !newSkills.map((skill) => skill.id).includes(currentSkill.id)
    );

    await Promise.all([
      ...skillsToAdd.map((skill) => service.addWilderSkill(wilderId, skill.id)),
      ...skillsToRemove.map((skill) =>
        service.deleteWilderSkill(wilderId, skill.id)
      ),
    ]);

    res.status(201).send(newSkills);
    // res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// remove skill to a wilder
router.delete("/:id/skills/:skillId", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const skillId = parseInt(req.params.skillId, 10);
    await service.deleteWilderSkill(id, skillId);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;
