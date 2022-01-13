import { createWithApollo } from './createWithApollo';
import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, makeVar } from '@apollo/client';
import { NextPageContext } from 'next';
import { parseCookies } from '../utils/parseCookies';
import { sessionToken } from '../utils/auth';
import 'isomorphic-fetch';

export const pendingRequestsVar = makeVar(0);

const excludePaths = ['/search']

// @ts-ignore
const fetcher = (...params) =>
  // @ts-ignore
  fetch(...params)
    .finally(() => {
      if (typeof location === 'object') {
        const deniend = excludePaths.some(path => location.pathname.includes(path))
        if (!deniend) pendingRequestsVar(pendingRequestsVar() - 1)
      }
    })

const httpLink = createHttpLink({ uri: process.env.API_PATH, fetch: fetcher });

const authLink = (ctx: NextPageContext) => new ApolloLink((operation, forward) => {
  if (typeof location === 'object') {
    const deniend = excludePaths.some(path => location.pathname.includes(path))
    if (!deniend) pendingRequestsVar(pendingRequestsVar() + 1)
  }

  const cookies = parseCookies(ctx?.req);
  if (cookies[sessionToken]) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${cookies[sessionToken]}`,
      },
    });
  }
  return forward(operation);
});

export const createClient = (ctx: NextPageContext) => {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            merge(existing, incoming) {
              console.log('sdf', existing)
              console.log('sdf', incoming)
              return {
                ...incoming,
              };
            }
          },
        },
      }
    }),
    link: authLink(ctx).concat(httpLink),
  });
};

export const withApollo = createWithApollo(createClient);
