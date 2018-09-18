import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthConsumer } from '../components/AuthContext';

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
    console.log('onSignUp in Home clicked.....');
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
      <AuthConsumer>
        {({ login }) => (
          <div id="homecontainer">
            {this.state.signUpUser && (
              <SignUp onSignUp={this.onSignUp} login={login} />
            )}
            {!this.state.signUpUser && (
              <SignIn
                onSignIn={this.onSignIn}
                onSignUp={this.onSignUp}
                login={login}
              />
            )}
          </div>
        )}
      </AuthConsumer>
    );
  }
}

export default withRouter(Home);
