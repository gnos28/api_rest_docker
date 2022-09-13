const express = require("express");
const typeorm = require("typeorm");
const Wilder = require("./Wilder");

const app = express();

app.use(express.json());

const dataSource = new typeorm.DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [require("./Wilder")],
  // logging: ["query", "error"],
});

app.get("/", async (req, res) => {
  const listWilders = await dataSource.getRepository(Wilder).find();
  console.log("list all wilders", listWilders);
  res.send(listWilders);
});

app.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const wilder = await dataSource.getRepository(Wilder).findBy({ id });
    console.log("find one wilder by id", wilder);
    if (wilder.length) return res.send(wilder);
    res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    const newWilder = await dataSource.getRepository(Wilder).save({ name });
    console.log("add a new wilder", newWilder);
    return res.status(201).send(newWilder);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const id = req.params.id;
    console.log(name);

    const updatedWilder = await dataSource
      .createQueryBuilder()
      .update(Wilder)
      .set({
        name,
      })
      .where("id = :id", { id })
      .execute();

    console.log("add a new wilder", updatedWilder);
    return res.status(200).send(updatedWilder);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const wilder = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Wilder)
      .where("id = :id", { id })
      .execute();
    console.log("delete wilder id", wilder);
    res.send(wilder);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

//Start Server
const start = async () => {
  await dataSource.initialize();
  // dataSource.getRepository(Wilder).save({ name: "Julien VIGNERON" });

  app.listen(5000, () => console.log("listening on port 5000"));
};

start();
