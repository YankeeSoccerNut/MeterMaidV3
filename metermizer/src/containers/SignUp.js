import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';

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

class SignUp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitForm(e) {
    e.preventDefault();
    this.props.onSignUp(this.state);
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={this.props.classes.layout}>
          <Paper className={this.props.classes.paper}>
            <Avatar className={this.props.classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">New Account Sign Up</Typography>
            <Mutation>
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
                    name="smsphone"
                    type="phone"
                    id="smsphone"
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
                <Button
                  type="submit"
                  onClick={e => this.submitForm(e)}
                  fullWidth
                  variant="raised"
                  color="primary"
                  className={this.props.classes.submit}
                >
                  Sign Up
                </Button>
              </form>
            </Mutation>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  onSignUp: PropTypes.func.isRequired
};

export default withStyles(styles)(SignUp);
