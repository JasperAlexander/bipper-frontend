import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client'
import { relayStylePagination, getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const httpLink = new HttpLink({
    uri: `http:${process.env.NEXT_PUBLIC_API_PRURL}/query`
})

const wsLink = typeof window !== 'undefined' ? new GraphQLWsLink(createClient({
    url: `ws:${process.env.NEXT_PUBLIC_API_PRURL}/query`,
})) : null

const splitLink = typeof window !== 'undefined' && wsLink !== null ? split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
) : httpLink

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                getAllBeeps: relayStylePagination()
            }
        }
    }
})

export const graphQLClient = new ApolloClient({
    link: splitLink,
    cache,
    defaultOptions: {
        watchQuery: {
            nextFetchPolicy: 'cache-and-network'
        }
    }
})
