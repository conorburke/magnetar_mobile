export const userToolsQuery = `
  query userToolsQuery($id: ID!) {
    user(id: $id) {
      id
      depots {
        tools {
          id
        }
      }
    }
  }
`;
