import { IRatedSkill } from "./ISkill";

export interface IWilder {
  id: string;
  name: string;
  description: string;
  skills: IRatedSkill[];
}

export interface IRawWilder {
  id: number;
  name: string;
  description: string;
  skills: IRatedSkill[];
}
