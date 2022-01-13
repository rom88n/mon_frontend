import { gql } from '@apollo/client';

export const ADD_SERVER = gql`
   mutation($data: ServerCreateInput) {
      createServer(data: $data) {
        id
      }
    }
`;