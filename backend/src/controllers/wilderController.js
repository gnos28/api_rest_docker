const express = require("express");
const service = require("../services/wilderService");

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
    const id = req.params.id;
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
    const id = req.params.id;
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
    const id = req.params.id;
    const deletedWilder = await service.delete(id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
