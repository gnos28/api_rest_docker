import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Wilder_Skills } from "./Wilder_Skills";

@Entity("skills")
export class Skills {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
}
