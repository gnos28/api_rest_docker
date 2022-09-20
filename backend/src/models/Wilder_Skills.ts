import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Wilder } from "./Wilder";
import { Skills } from "./Skills";

@Entity("wilder_skills")
export class Wilder_Skills {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wilderId: number;

  @Column()
  skillsId: number;

  @Column({ nullable: true })
  rating: number;

  @ManyToOne(() => Wilder, (wilder) => wilder.id)
  wWWilder: Wilder;

  @ManyToOne(() => Skills, (skills) => skills.id)
  wSkills: Skills;
}

// const EntitySchema = require("typeorm").EntitySchema;

// module.exports = new EntitySchema({
//   name: "Wilder_Skills",
//   tableName: "wilder_skills",
//   columns: {
//     id: {
//       type: "int",
//       primary: true,
//       generated: true,
//     },
//     wilderId: {
//       type: "int",
//     },
//     skillsId: {
//       type: "int",
//     },
//     rating: {
//       type: "int",
//       default: 0,
//     },
//   },
//   relations: {
//     wilder: {
//       target: "wilder",
//       type: "many-to-one",
//       inverseSide: "wWilder",
//     },
//     skills: {
//       target: "skills",
//       type: "many-to-one",
//       inverseSide: "wSkills",
//     },
//   },
// });
