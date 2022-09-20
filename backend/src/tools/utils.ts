import { DataSource } from "typeorm";
import { Wilder } from "../models/Wilder";
import { Wilder_Skills } from "../models/Wilder_Skills";
import { Skills } from "../models/Skills";

const dataSource = new DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [Wilder, Wilder_Skills, Skills],
  // logging: ["query", "error"],
});

export default dataSource;
