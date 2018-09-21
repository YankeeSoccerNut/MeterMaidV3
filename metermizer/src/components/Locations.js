import React, { PureComponent, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PlaceIcon from '@material-ui/icons/Place';
import TimelineIcon from '@material-ui/icons/Timeline';

import PropTypes from 'prop-types';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class Locations extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  handleOnClickLocation(locationId, e) {
    this.setState({ open: !this.state.open });
    this.props.onClickLocation(locationId);
  }
  handleOnClickThermostat(thermostatId, e) {
    e.stopPropagation();
    console.log('Location Thermostat Id Clicked: ', thermostatId);
  }

  render() {
    const { locations, classes } = this.props;

    return (
      <List component="div" subheader="Your Locations">
        {locations.map(location => {
          const l = location.node.locationByLocationId;
          const t = l.thermostatsByLocationId.edges;
          return (
            <ListItem
              button
              key={l.id}
              onClick={this.handleOnClickLocation.bind(this, l.id)}
            >
              <ListItemIcon>
                <PlaceIcon />
              </ListItemIcon>
              <ListItemText>
                {l.name} {l.zip5}
              </ListItemText>
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding subheader="Thermostats:">
                  {t.map(thermostat => {
                    return (
                      <Fragment key={thermostat.node.id}>
                        <ListItem
                          key={thermostat.node.id}
                          className={classes.nested}
                          button
                          onClick={this.handleOnClickThermostat.bind(
                            this,
                            thermostat.node.id
                          )}
                        >
                          <ListItemIcon>
                            <TimelineIcon />
                          </ListItemIcon>
                          <ListItemText inset>
                            {thermostat.node.userDefinedDeviceName}
                          </ListItemText>
                        </ListItem>
                      </Fragment>
                    );
                  })}
                </List>
              </Collapse>
            </ListItem>
          );
        })}
      </List>
    );
  }
}

Locations.propTypes = {
  onClickLocation: PropTypes.func,
  classes: PropTypes.object
};

export default withStyles(styles)(Locations);
