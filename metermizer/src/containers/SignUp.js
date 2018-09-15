import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../styles/SignUp';
import MeterMizerSnackBar from '../components/MeterMizerSnackBar';

const SIGNUP_USER = gql`
  mutation SignUp(
    $firstname: String!
    $lastname: String!
    $email: String!
    $phone: String!
    $password: String!
  ) {
    signupUser(
      input: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        phone: $phone
        password: $password
      }
    ) {
      user {
        id
      }
    }
  }
`;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.signUpCompleted = this.signUpCompleted.bind(this);
    this.signUpError = this.signUpError.bind(this);
    this.clearErrorMessage = this.clearErrorMessage.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  signUpCompleted(data) {
    console.log('signUpCompleted data: ', data);
  }

  signUpError(graphQLErrors) {
    console.log('typeof graphQLErrors...', typeof graphQLErrors);
    for (const key in graphQLErrors) {
      console.log('key in graphQLErrors-->', key);
    }
    console.log('signUpError error: ', graphQLErrors);
    this.setState({
      showError: true,
      error: graphQLErrors.message
    });
  }

  clearErrorMessage() {
    this.setState({
      showError: false,
      error: ''
    });
    console.log('clearErrorMessage called');
  }
  render() {
    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      showError,
      error
    } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={this.props.classes.layout}>
          <Paper className={this.props.classes.paper}>
            <Avatar className={this.props.classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">New Account Sign Up</Typography>
            <form className={this.props.classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="companyname">Company Name</InputLabel>
                <Input
                  name="companyname"
                  type="text"
                  id="companyname"
                  autoComplete="company-name"
                  onChange={e => this.handleChange(e)}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="firstname">First Name</InputLabel>
                <Input
                  name="firstname"
                  type="text"
                  id="firstname"
                  autoComplete="first-name"
                  onChange={e => this.handleChange(e)}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                <Input
                  name="lastname"
                  type="text"
                  id="lastname"
                  autoComplete="last-name"
                  onChange={e => this.handleChange(e)}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <Input
                  name="phone"
                  type="phone"
                  id="phone"
                  autoComplete="phone"
                  onChange={e => this.handleChange(e)}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={e => this.handleChange(e)}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={e => this.handleChange(e)}
                />
              </FormControl>
              <Mutation
                mutation={SIGNUP_USER}
                variables={{
                  firstname,
                  lastname,
                  email,
                  phone,
                  password
                }}
                onCompleted={this.signUpCompleted}
                onError={graphQLErrors => this.signUpError(graphQLErrors)}
              >
                {onSignup => {
                  return (
                    <Button
                      onClick={onSignup}
                      fullWidth
                      variant="raised"
                      color="primary"
                      className={this.props.classes.submit}
                    >
                      Sign Up!
                    </Button>
                  );
                }}
              </Mutation>
            </form>
          </Paper>
        </main>
        {showError && (
          <MeterMizerSnackBar
            open={showError}
            variant="error"
            message={error}
            onClose={this.clearErrorMessage}
          />
        )}
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  onSignUp: PropTypes.func.isRequired
};

export default withStyles(styles)(SignUp);
