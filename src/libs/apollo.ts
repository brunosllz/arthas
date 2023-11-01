import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apolloClient = new ApolloClient({
  uri: 'https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/cloais14wfzwa01uk3tek5tsw/master',
  cache: new InMemoryCache(),
})
