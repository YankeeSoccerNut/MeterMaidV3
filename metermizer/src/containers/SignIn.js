import React, { PureComponent } from 'react';
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
import styles from '../styles/SignIn';

class SignIn extends PureComponent {
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

    console.log(
      'this.props.login submitForm SignIn.js >>>>>>>>>>',
      this.props.login
    );

    this.props.login(142);
    this.props.history.push('/userLocations');
  }

  render() {
    const { classes, onSignUp } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            <form className={classes.form}>
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
                className={classes.submit}
              >
                Sign in
              </Button>
              <Button
                type="button"
                onClick={() => onSignUp()}
                variant="raised"
                color="secondary"
                className={classes.submit}
              >
                Need an Account?
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}
SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SignIn));
