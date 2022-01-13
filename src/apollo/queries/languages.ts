import { gql } from '@apollo/client';

export const ALL_LANGUAGES = gql`
 query {
    allLanguages {
      results
    }
  }
`;