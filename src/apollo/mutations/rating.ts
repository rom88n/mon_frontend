import { gql } from '@apollo/client';

export const ADD_RATING = gql`
   mutation($serverId: String!) {
     rating: AddRating(serverId: $serverId)
   }
`;