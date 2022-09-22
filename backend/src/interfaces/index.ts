export type BaseSkill = {
  rating: number;
  id: number;
  name: string;
};

export type SkilledWilder = {
  skills: BaseSkill[];
  id: number;
  name: string;
  description: string;
};
