import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
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
import signUpNewUser from '../utils/signUpNewUser';

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

  validateForm() {
    console.log('form validation goes here....');
    return true;
  }

  async onSignUp(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    console.log('onSignUp e, this.state', e, this.state);

    await signUpNewUser(this.state, this.signUpCompleted, this.signUpError);
  }

  signUpCompleted(results) {
    console.log('signUpCompleted results: ', results);
    this.props.history.push('/userLocations');
  }

  signUpError(error) {
    this.setState({
      showError: true,
      errorCode: error.graphQLErrors[0].errcode,
      errorMessage: error.graphQLErrors[0].detail
    });
  }

  clearErrorMessage() {
    this.setState({
      showError: false,
      errorCode: '',
      errorMessage: ''
    });
  }

  render() {
    const { showError, errorMessage } = this.state;
    return (
      <Fragment>
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
                  required
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
                  required
                  type="text"
                  id="lastname"
                  autoComplete="last-name"
                  onChange={e => this.handleChange(e)}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <Input
                  required
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
                  required
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
                  required
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={e => this.handleChange(e)}
                />
              </FormControl>
              <Button
                onClick={e => this.onSignUp(e)}
                fullWidth
                variant="raised"
                color="primary"
                className={this.props.classes.submit}
              >
                Sign Up!
              </Button>
            </form>
          </Paper>
        </main>
        {showError && (
          <MeterMizerSnackBar
            open={showError}
            variant="error"
            message={errorMessage}
            onClose={this.clearErrorMessage}
          />
        )}
      </Fragment>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  onSignUp: PropTypes.func.isRequired
};

export default withRouter(withStyles(styles)(SignUp));
