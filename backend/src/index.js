const express = require("express");
const typeorm = require("typeorm");
const Wilder = require("./Wilder");

const app = express();

const dataSource = new typeorm.DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [require("./Wilder")],
});

app.get("/", async (req, res) => {
  const listWilders = await dataSource.getRepository(Wilder).find();
  console.log("listWilders", listWilders);
  res.send(listWilders);
});

//Start Server
const start = async () => {
  await dataSource.initialize();
  dataSource.getRepository(Wilder).save({ name: "Julien VIGNERON" });

  app.listen(5000, () => console.log("OK"));
};

start();
