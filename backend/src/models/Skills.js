const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "skills",
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
    rating: {
      type: "int",
      default: 0,
    },
  },
});
