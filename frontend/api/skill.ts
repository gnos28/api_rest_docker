import { api } from "./api";
import { ISkill, IRawSkill } from "../interfaces/ISkill";
import { gql } from "@apollo/client";

type Side = "ssr" | "csr";

export const skillAPI = {
  getAll: async (side: Side): Promise<ISkill[]> => {
    const skills = (
      await api[side].query({
        query: gql`
          query Query {
            Skills {
              id
              name
            }
          }
        `,
      })
    ).data.Skills as IRawSkill[];

    return skills.map((skill) => ({ ...skill, id: skill.id.toString() }));
  },
};
