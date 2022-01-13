import { gql } from "@apollo/client";

export const ALL_NEWS = gql`
  query ($skip: Int, $limit: Int, $lang: PostLangType!) {
    news: allPosts(where: { lang: $lang }, skip: $skip, first: $limit) {
      id
      title
      description
      slug
      lang
      picture
      sourceAuthor
      sourceLink
      createdAt
    }
    total: _allPostsMeta(where: { lang: $lang }) {
      count
    }
  }
`;

export const NEWS_BY_SLUG = gql`
  query ($slug: String!) {
    news: GetOneNews(slug: $slug) {
      id
      title
      description
      slug
      lang
      picture
      sourceAuthor
      sourceLink
      visitors
      createdAt
    }
  }
`;
