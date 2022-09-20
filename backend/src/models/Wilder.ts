import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Wilder_Skills } from "./Wilder_Skills";

// const EntitySchema = require("typeorm").EntitySchema;

@Entity("wilder")
export class Wilder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Wilder_Skills, (wilderSkill) => wilderSkill.wilderId)
  wilderSkills: Wilder_Skills[];
}

// module.exports = new EntitySchema({
//   name: "Wilder",
//   tableName: "wilder",
//   columns: {
//     id: {
//       primary: true,
//       type: "int",
//       generated: true,
//     },
//     name: {
//       type: "text",
//     },
//     description: {
//       type: "text",
//       nullable: true,
//     },
//   },
//   relations: {
//     wWilder: {
//       target: "wilder_skills",
//       type: "one-to-many",
//       cascade: true,
//       inverseSide: "wilder",
//     },
//   },
// });
