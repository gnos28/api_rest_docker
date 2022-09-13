const typeorm = require("typeorm");

const dataSource = new typeorm.DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [require("../models/Wilder")],
  // logging: ["query", "error"],
});

module.exports = dataSource;
