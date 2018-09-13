import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const graphqlClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

async function getAllReadings() {
  let results = await graphqlClient.query({
    query: gql`
      {
        allReadings {
          pageInfo {
            startCursor
            endCursor
          }
          nodes {
            id
            thermostatId
            createdAt
            dispTemp
            displayUnits
            weatherTemp
            weatherTempUnit
            weatherCondition
          }
        }
      }
    `
  });

  return results;
}

export default getAllReadings;
