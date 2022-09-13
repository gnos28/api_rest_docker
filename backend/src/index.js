const express = require("express");
const wilderController = require("./controllers/wilderController");
const dataSource = require("./tools/utils");

const app = express();

app.use(express.json());

app.use("/api/wilders", wilderController);

const start = async () => {
  await dataSource.initialize();
  app.listen(5000, () => console.log("listening on port 5000"));
};

start();
