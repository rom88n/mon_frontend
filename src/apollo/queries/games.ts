import { gql } from '@apollo/client';

export const HOME_PAGE_ALL_GAMES = gql`
  query {
    allGames {
      id
      title
      description
      slug
    }
  }
`;

export const ALL_GAMES = gql`
  query {
    games: allGames {
      id
      title
      slug
    }
  }
`;

export const ALL_GAMES_PAGE = gql`
  query {
    games: allGames {
      id
      title
      slug
      servers: _serversMeta {
        count
      }
    }
  }
`;

export const GAME_BY_SLUG = gql`
  query($slug: String!) {
     GameBySlug(slug: $slug) {
      id
      title
      slug
      description
    }
  }
`;