import React from 'react';

const AuthContext = React.createContext({
  isAuth: false,
  userId: null
});

class AuthProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuth: false,
      userId: null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  login(userId) {
    console.log('setting context isAuth to TRUE, userId: ', userId);
    this.setState({
      isAuth: true,
      userId: userId
    });
  }
  logout() {
    console.log('setting context isAuth to FALSE');
    this.setState({
      isAuth: false,
      userId: null
    });
  }
  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout,
          userId: this.state.userId
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
