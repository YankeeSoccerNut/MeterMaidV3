import gql from 'graphql-tag';

const GET_LOCATIONS = gql`
  query AllUserLocations($userId: Int!) {
    allUserLocations(condition: { userId: $userId }) {
      nodes {
        locationByLocationId {
          id
          name
          addr1
          addr2
          zip5
          thermostatsByLocationId {
            nodes {
              id
              thermostatId
              deviceName
              userDefinedDeviceName
              lastPolledAt
            }
          }
        }
      }
    }
  }
`;

export default GET_LOCATIONS;
