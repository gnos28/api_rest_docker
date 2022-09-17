const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "skills",
  tableName: "skills",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "text",
      unique: true,
    },
  },
  relations: {
    wSkills: {
      target: "Wilder_Skills",
      type: "one-to-many",
      cascade: true,
      inverseSide: "skills",
    },
  },
});
