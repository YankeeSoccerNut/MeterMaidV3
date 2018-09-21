import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { withRouter } from 'react-router-dom';
import Locations from '../components/Locations';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from '../styles/UserLocations';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AuthConsumer } from '../components/AuthContext';
import MeterMizerSnackBar from '../components/MeterMizerSnackBar';
import GET_LOCATIONS from '../queries/GET_LOCATIONS';

class UserLocations extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClickLocation = this.onClickLocation.bind(this);
  }

  onClickLocation(locationId) {
    console.log('UserLocations onClickLocation ', locationId);
  }

  render() {
    const { classes } = this.props;
    return (
      <div id="userlocationscontainer" className={classes.layout}>
        <CssBaseline>
          <h1>UserLocations Placeholder</h1>
          <AuthConsumer>
            {({ userId }) => (
              <Query query={GET_LOCATIONS} variables={{ userId: userId }}>
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
                    <Locations
                      locations={data.allUserLocations.edges}
                      onClickLocation={this.onClickLocation}
                    />
                  );
                }}
              </Query>
            )}
          </AuthConsumer>
        </CssBaseline>
      </div>
    );
  }
}

UserLocations.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(UserLocations));
