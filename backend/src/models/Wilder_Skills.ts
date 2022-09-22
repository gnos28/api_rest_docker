import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Wilder } from "./Wilder";
import { Skills } from "./Skills";

@Entity("wilder_skills")
export class Wilder_Skills {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  rating: number;

  @Column()
  @ManyToOne(() => Wilder, { onDelete: "CASCADE" })
  @JoinColumn({ name: "wilderId" })
  wilderId: Wilder["id"];

  @Column()
  @ManyToOne(() => Skills, { onDelete: "CASCADE" })
  @JoinColumn({ name: "skillsId" })
  skillsId: Skills["id"];
}