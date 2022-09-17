const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Wilder_Skills",
  tableName: "wilder_skills",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    wilderId: {
      type: "int",
    },
    skillsId: {
      type: "int",
    },
    rating: {
      type: "int",
      default: 0,
    },
  },
  relations: {
    wilder: {
      target: "wilder",
      type: "many-to-one",
      inverseSide: "wWilder",
    },
    skills: {
      target: "skills",
      type: "many-to-one",
      inverseSide: "wSkills",
    },
  },
});
