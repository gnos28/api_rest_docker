import IWilder from "../interfaces/IWilder";

export default (wilder: IWilder) => ({
  query: `mutation Mutation {
    createWilder(wilder: { name: "${wilder.name}", description: "${wilder.description}" }) {
      id
      name
      description
    }
  }
  `,
});
