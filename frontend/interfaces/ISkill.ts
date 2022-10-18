export interface ISkill {
  id: number;
  name: string;
}

export interface IRatedSkill extends ISkill {
  rating: number;
}
    