import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("wilder")
export class Wilder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;
}
