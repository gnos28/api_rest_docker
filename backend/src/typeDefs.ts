import { gql } from "apollo-server";

const typeDefs = gql`
  #graphql
  type Wilder {
    id: ID
    name: String
    description: String
    skills: [Skill]
  }

  input iWilder {
    name: String
    description: String
  }

  input iSkill {
    name: String
  }

  type Rating {
    rating: Int
  }

  type Skill {
    id: ID
    name: String
  }

  type Query {
    Wilders: [Wilder]
    Wilder(id: Int): Wilder
    Skills: [Skill]
    Skill: Skill
  }

  type Mutation {
    createSkill(name: String): Skill
    updateSkill(skill: iSkill, skillId: Int): Skill
    deleteSkill(skill: iSkill, skillId: Int): Skill
    createWilder(name: String, description: String): Wilder
    updateWilder(wilder: iWilder, wilderId: Int): Wilder
    deleteWilder(wilder: iWilder, wilderId: Int): Wilder
    addWilderSkill(wilderId: Int, skillsId: Int): Wilder
    updateWilderSkill(wilderId: Int, skillsId: Int, rating: Int): Wilder
    deleteWilderSkill(wilderId: Int, skillsId: Int): Wilder
  }
`;

export default typeDefs;
