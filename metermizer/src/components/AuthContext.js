import React from 'react';

const AuthContext = React.createContext({ isAuth: false });

class AuthProvider extends React.Component {
  constructor() {
    super();
    this.state = { isAuth: false };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  login() {
    console.log('setting context isAuth to TRUE');
    this.setState({ isAuth: true });
  }
  logout() {
    console.log('setting context isAuth to FALSE');
    this.setState({ isAuth: false });
  }
  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
