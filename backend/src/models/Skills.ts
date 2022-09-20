import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Wilder_Skills } from "./Wilder_Skills";

@Entity("skills")
export class Skills {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToMany(() => Wilder_Skills, (wilderSkill) => wilderSkill.skillsId)
  wilderSkills: Wilder_Skills[];
}

// const EntitySchema = require("typeorm").EntitySchema;

// module.exports = new EntitySchema({
//   name: "skills",
//   tableName: "skills",
//   columns: {
//     id: {
//       primary: true,
//       type: "int",
//       generated: true,
//     },
//     name: {
//       type: "text",
//       unique: true,
//     },
//   },
//   relations: {
//     wSkills: {
//       target: "Wilder_Skills",
//       type: "one-to-many",
//       cascade: true,
//       inverseSide: "skills",
//     },
//   },
// });
