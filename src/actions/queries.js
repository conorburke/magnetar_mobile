export const toolsQuery = `{
  tools {
    id
    title
    category
    description
    price
    depot {
      id
      owner_id
      owner {
        id
        first_name
        last_name
      }
    }
  }
}`;
