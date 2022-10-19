import IWilder from "../interfaces/IWilder";

export default (id: number, wilder: IWilder) => ({
  query: `mutation Mutation {
    updateWilder(wilderId: ${id}, wilder: ${wilder}) {
      id
      name
      description
    }
  }  
  `,
});
