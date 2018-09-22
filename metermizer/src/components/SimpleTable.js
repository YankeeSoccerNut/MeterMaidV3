import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
};

class SimpleTable extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes, readings } = this.props;

    if (readings.length === 0) {
      return <h4>No Readings to Display</h4>;
    }

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Captured At</TableCell>
              <TableCell numeric>Display Temp</TableCell>
              <TableCell>Display Temp Unit</TableCell>
              <TableCell numeric>Weather Temp</TableCell>
              <TableCell>Weather Temp Unit</TableCell>
              <TableCell>Weather Condition</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {readings.map(r => {
              return (
                <TableRow key={r.id}>
                  <TableCell component="th" scope="row">
                    {r.thermCreatedAt}
                  </TableCell>
                  <TableCell numeric>{r.dispTemp}</TableCell>
                  <TableCell>{r.displayUnits}</TableCell>
                  <TableCell numeric>{r.weatherTemp}</TableCell>
                  <TableCell>{r.weatherTempUnit}</TableCell>
                  <TableCell>{r.weatherCondition}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  readings: PropTypes.array.isRequired
};

export default withStyles(styles)(SimpleTable);
