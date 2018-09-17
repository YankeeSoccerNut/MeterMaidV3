import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import getLocalUser from '../utils/getLocalUser';
import SignIn from './SignIn';
import SignUp from './SignUp';

class Home extends Component {
  constructor() {
    super();
    this.onSignUp = this.onSignUp.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props);
    let localUser = getLocalUser();
    console.log('localUser: ', localUser);
  }

  onSignIn(signInObject) {
    console.log('onLogin in Home container....', signInObject);
  }

  onSignUp(signUpObject) {
    if (!signUpObject) {
      this.setState({
        signUpUser: true
      });
      return;
    }
    // assume form validation has occurred and signUpObject is valid...
    // Attempt to create a new User

    console.log('onSignUp in Home container...', signUpObject);
  }

  render() {
    return (
      <div id="homecontainer">
        <h1>Homepage Placeholder</h1>
        {this.state.signUpUser && <SignUp onSignUp={this.onSignUp} />}
        {!this.state.signUpUser && (
          <SignIn onSignIn={this.onSignIn} onSignUp={this.onSignUp} />
        )}
      </div>
    );
  }
}

export default withRouter(Home);
