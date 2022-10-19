export default (id: number) => ({
  query: `mutation Mutation {
    deleteWilder(wilderId: ${id}) {
      id
    }
  }
  `,
});
