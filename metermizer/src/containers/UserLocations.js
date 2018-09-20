import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Locations from '../components/Locations';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from '../styles/UserLocations';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AuthConsumer } from '../components/AuthContext';

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
          <List component="nav" subheader="Your Locations">
            <AuthConsumer>
              {({ userId }) => (
                <Locations
                  userId={userId}
                  onClickLocation={this.onClickLocation}
                />
              )}
            </AuthConsumer>
          </List>
        </CssBaseline>
      </div>
    );
  }
}

UserLocations.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(UserLocations));
