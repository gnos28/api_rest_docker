const express = require("express");
const service = require("../services/skillsService");

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
    const id = req.params.id;
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
    const newSkill = await service.create(payload);
    return res.status(201).send(newSkill);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
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
    const id = req.params.id;
    const deletedSkill = await service.delete(id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
