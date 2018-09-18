import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class UserLocations extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div id="userlocationscontainer">
        <h1>UserLocations Placeholder</h1>
        <Button
          onClick={() => this.props.history.push('/dashboard')}
          fullWidth
          variant="raised"
          color="primary"
        >
          Hit dashboard route
        </Button>
      </div>
    );
  }
}

export default withRouter(UserLocations);
