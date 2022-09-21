import { IRatedSkill } from "./ISkill";

export default interface IWilder {
  id: number;
  name: string;
  description: string;
  skills: IRatedSkill[];
}
