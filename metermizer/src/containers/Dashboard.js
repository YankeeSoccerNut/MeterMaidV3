import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import SimpleLineChart from '../components/SimpleLineChart';
import SimpleTable from '../components/SimpleTable';

import MeterMizerSnackBar from '../components/MeterMizerSnackBar';
import GET_READINGS from '../queries/GET_READINGS';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBarSpacer: theme.mixins.toolbar,
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  }
});

class Dashboard extends Component {
  render() {
    const { classes, location } = this.props;
    const meterId = location.state.meterId;

    console.log('Dashboard meterId: ', meterId);
    return (
      <div id="dashboardcontainer" classes={classes.layout}>
        <CssBaseline />
        <h1>MeterReadings Placeholder</h1>

        <Query query={GET_READINGS} variables={{ thermostatId: meterId }}>
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
            console.log('readings....', data);
            return (
              <div>
                <div className={classes.appBarSpacer} />
                <Typography variant="display1" gutterBottom>
                  Readings Over Time
                </Typography>
                <Typography component="div" className={classes.chartContainer}>
                  <SimpleLineChart readings={data.allReadings.nodes} />
                </Typography>
                <Typography variant="display1" gutterBottom>
                  Readings
                </Typography>
                <div className={classes.tableContainer}>
                  <SimpleTable readings={data.allReadings.nodes} />
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Dashboard));
