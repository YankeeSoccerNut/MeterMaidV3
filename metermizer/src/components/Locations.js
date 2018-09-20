import React, { PureComponent, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import MeterMizerSnackBar from './MeterMizerSnackBar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PlaceIcon from '@material-ui/icons/Place';
import PropTypes from 'prop-types';

const GET_LOCATIONS = gql`
  query AllUserLocations($id: Int!) {
    allUserLocations(condition: { userId: $id }) {
      edges {
        node {
          locationByLocationId {
            id
            name
            addr1
            addr2
            zip5
          }
        }
      }
    }
  }
`;

class Locations extends PureComponent {
  constructor(props) {
    super(props);
  }
  handleOnClick(locationId) {
    this.props.onClickLocation(locationId);
  }

  render() {
    return (
      <Query query={GET_LOCATIONS} variables={{ id: 142 }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error)
            return (
              <MeterMizerSnackBar
                open
                variant="error"
                message={error.message}
                onClose={() => {}}
              />
            );

          return (
            <Fragment>
              {data.allUserLocations.edges.map(location => {
                return (
                  <ListItem
                    button
                    key={location.node.locationByLocationId.id}
                    onClick={this.handleOnClick.bind(
                      this,
                      location.node.locationByLocationId.id
                    )}
                  >
                    <ListItemIcon>
                      <PlaceIcon />
                    </ListItemIcon>
                    <ListItemText>
                      {location.node.locationByLocationId.name}
                    </ListItemText>
                  </ListItem>
                );
              })}
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

Locations.propTypes = {
  onClickLocation: PropTypes.func,
  classes: PropTypes.object
};

export default Locations;
