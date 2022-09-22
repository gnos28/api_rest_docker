import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Wilder_Skills } from "./Wilder_Skills";

@Entity("wilder")
export class Wilder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;
}
