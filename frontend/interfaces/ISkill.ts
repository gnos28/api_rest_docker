export interface ISkill {
  id: string;
  name: string;
}

export interface IRawSkill {
  id: number;
  name: string;
}

export interface IRatedSkill extends ISkill {
  rating: number;
}
