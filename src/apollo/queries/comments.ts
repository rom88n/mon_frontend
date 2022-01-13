import { gql } from '@apollo/client';

export const COMMENTS_BY_ENTITY = gql`
  query($post: ID!) {
    comments: allComments(where: { post: { id: $post } }) {
      id
      userName
      text
    }
  }
`;