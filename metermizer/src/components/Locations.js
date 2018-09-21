import React, { PureComponent, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
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

    if (locations.length === 0) {
      return <h4>No Locations to Display</h4>;
    }
    return (
      <div>
        <List
          component="nav"
          subheader={
            <ListSubheader component="div">Your Locations</ListSubheader>
          }
        >
          {locations.map(location => {
            const l = location.node.locationByLocationId;
            const t = l.thermostatsByLocationId.edges;
            return (
              <Fragment key={l.id}>
                <ListItem
                  button
                  onClick={this.handleOnClickLocation.bind(this, l.id)}
                >
                  <ListItemIcon>
                    <PlaceIcon />
                  </ListItemIcon>
                  <ListItemText inset primary={`${l.name} ${l.zip5}`} />
                  {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {t.map(thermostat => {
                      return (
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
                          <ListItemText
                            inset
                            primary={thermostat.node.userDefinedDeviceName}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </Fragment>
            );
          })}
        </List>
      </div>
    );
  }
}

Locations.propTypes = {
  onClickLocation: PropTypes.func,
  classes: PropTypes.object,
  locations: PropTypes.array.isRequired
};

export default withStyles(styles)(Locations);
