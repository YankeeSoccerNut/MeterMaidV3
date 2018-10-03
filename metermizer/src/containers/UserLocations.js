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
    this.onClickMeter = this.onClickMeter.bind(this);
  }

  onClickMeter(meterId) {
    this.props.history.push({
      pathname: '/dashboard',
      state: { meterId: meterId }
    });
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
                      locations={data.allUserLocations.nodes}
                      onClickMeter={this.onClickMeter}
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
