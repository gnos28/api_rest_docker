const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Wilder",
  tableName: "wilder",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "text",
    },
    description: {
      type: "text",
      nullable: true,
    },
  },
  relations: {
    wWilder: {
      target: "wilder_skills",
      type: "one-to-many",
      cascade: true,
      inverseSide: "wilder",
    },
  },
});
