export default {
  query: `query Query {
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
  }`,
};
