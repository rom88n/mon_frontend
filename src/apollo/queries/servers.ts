import { gql } from '@apollo/client';

const filterQuery = '$game: String, $skip: Int, $limit: Int, $search: String, $sortBy: [SortServersBy!], $country: String';
const filter = 'where: { game: { slug: $game }, online: true, country: $country, OR: [ {name_contains: $search }, { map_contains: $search }] }';

export const ALL_SERVERS = gql`
  query (${filterQuery}) {
    allServers(${filter}, skip: $skip, first: $limit, sortBy: $sortBy) {
      id
      name
      country
      host
      port
      map
      players
      maxPlayers
      rating
      online
      game {
        slug
      }
    }
    _allServersMeta(${filter}) {
      count
    }
  }
`;

export const SERVERS_BY_GAME = gql`
  query ($game: String, $skip: Int, $limit: Int) {
    allServers(where: { game: { slug: $game }, online: true }, skip: $skip, first: $limit, sortBy: game_DESC) {
      id
      name
      country
      host
      port
      map
      players
      maxPlayers
      rating
      online
      game {
        slug
      }
    }
     _allServersMeta(where: { game: { slug: $game } }) {
      count
    }
  }
`;

export const GET_SERVER = gql`
  query ($server: ID!) {
    Server(where: { id: $server }) {
      id
      name
      country
      host
      port
      map
      players
      maxPlayers
      rating
      online
      game {
        title
        slug
      }
    }
  }
`;