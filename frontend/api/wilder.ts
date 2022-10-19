import { api } from "./api";
import { IWilder, IRawWilder } from "../interfaces/IWilder";
import { ISkill, IRatedSkill, IRawSkill } from "../interfaces/ISkill";
import { gql } from "@apollo/client";

type Side = "ssr" | "csr";
type WilderVariables = {
  wilderId: number;
  skillsId?: number;
  wilder?: Partial<Omit<IWilder, "skills"> & { skills: Partial<IRatedSkill> }>;
  skills?: Partial<Omit<IRatedSkill, "id"> & { id: number }>[];
  rating?: number;
};

export const wilderAPI = {
  create: async (side: Side, wilder: Partial<IWilder>): Promise<IWilder> => {
    const newWilder = (
      await api[side].mutate({
        mutation: gql`
          mutation Mutation($wilder: iWilder!) {
            createWilder(wilder: $wilder) {
              id
              name
              description
            }
          }
        `,
        variables: {
          wilder: { name: wilder.name, description: wilder.description },
        },
      })
    ).data.createWilder as IRawWilder;

    return { ...newWilder, id: newWilder.id.toString() };
  },

  getAll: async (side: Side): Promise<IWilder[]> => {
    const wilders = (
      await api[side].query({
        query: gql`
          query Query {
            Wilders {
              id
              name
              description
              skills {
                id
                name
                rating
              }
            }
          }
        `,
      })
    ).data.Wilders as IRawWilder[];

    return wilders.map((wilder) => ({ ...wilder, id: wilder.id.toString() }));
  },

  getSkills: async (side: Side): Promise<ISkill[]> => {
    const skills = (
      await api[side].query({
        query: gql`
          query Query {
            Wilders {
              skills {
                id
                name
                rating
              }
            }
          }
        `,
      })
    ).data.Wilders.skills as IRawSkill[];

    return skills.map((skill) => ({ ...skill, id: skill.id.toString() }));
  },

  updateName: async (
    side: Side,
    id: IWilder["id"],
    name: string
  ): Promise<string> => {
    const variables: WilderVariables = {
      wilderId: parseInt(id, 10),
      wilder: { name },
    };

    const updated = (
      await api[side].mutate({
        mutation: gql`
          mutation Mutation($wilderId: Float!, $wilder: iWilder!) {
            updateWilder(wilderId: $wilderId, wilder: $wilder) {
              name
            }
          }
        `,
        variables,
      })
    ).data.updateWilder as IRawWilder;

    return updated.name;
  },

  updateDescription: async (
    side: Side,
    id: IWilder["id"],
    description: string
  ): Promise<string> => {
    const variables: WilderVariables = {
      wilderId: parseInt(id, 10),
      wilder: { description },
    };

    const updated = (
      await api[side].mutate({
        mutation: gql`
          mutation Mutation($wilderId: Float!, $wilder: iWilder!) {
            updateWilder(wilderId: $wilderId, wilder: $wilder) {
              name
            }
          }
        `,
        variables,
      })
    ).data.updateWilder as IRawWilder;

    return updated.description;
  },

  updateSkillRating: async (
    side: Side,
    wid: IWilder["id"],
    sid: ISkill["id"],
    rating: number
  ): Promise<IWilder> => {
    const variables: WilderVariables = {
      wilderId: parseInt(wid, 10),
      skillsId: parseInt(sid, 10),
      rating,
    };

    const updated = (
      await api[side].mutate({
        mutation: gql`
          mutation Mutation(
            $rating: Float!
            $skillsId: Float!
            $wilderId: Float!
          ) {
            updateWilderSkillRating(
              rating: $rating
              skillsId: $skillsId
              wilderId: $wilderId
            ) {
              skills {
                id
                name
                rating
              }
            }
          }
        `,
        variables,
      })
    ).data.updateWilderSkillRating as IWilder;

    return updated;
  },

  updateSkills: async (
    side: Side,
    wilderId: IWilder["id"],
    skills: IRatedSkill[]
  ): Promise<void> => {
    const variables: WilderVariables = {
      wilderId: parseInt(wilderId, 10),
      skills: skills.map((skill) => ({
        // id: parseInt(skill.id, 10),
        name: skill.name,
        // rating: skill.rating,
      })),
    };

    const updated = (
      await api[side].mutate({
        mutation: gql`
          mutation Mutation($skills: [iSkills!]!, $wilderId: Float!) {
            updateWilderSkills(skills: $skills, wilderId: $wilderId) {
              description
              name
              id
            }
          }
        `,
        variables,
      })
    ).data.updateWilderSkills as IWilder;

    return;
  },

  delete: async (side: Side, id: IWilder["id"]): Promise<void> => {
    const variables: WilderVariables = {
      wilderId: parseInt(id, 10),
    };

    const updated = (
      await api[side].mutate({
        mutation: gql`
          mutation Mutation($wilderId: Float!) {
            deleteWilder(wilderId: $wilderId) {
              id
            }
          }
        `,
        variables,
      })
    ).data.deleteWilder as IRawWilder;

    return;
  },
};
