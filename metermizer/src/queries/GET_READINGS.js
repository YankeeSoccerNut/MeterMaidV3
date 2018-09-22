import gql from 'graphql-tag';

const GET_READINGS = gql`
  query AllReadings($thermostatId: Int!) {
    allReadings(
      condition: { thermostatId: $thermostatId }
      orderBy: CREATED_AT_DESC
    ) {
      totalCount
      pageInfo {
        startCursor
        endCursor
      }
      nodes {
        id
        weatherTemp
        weatherTempUnit
        weatherCondition
        dispTemp
        displayUnits
        createdAt
        thermCreatedAt
      }
    }
  }
`;

export default GET_READINGS;
