import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import ButtonAppBar from './components/ButtonAppBar';
import Home from './containers/Home';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import SignOut from './containers/SignOut';
import Dashboard from './containers/Dashboard';
import UserLocations from './containers/UserLocations';

import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import logo from './logo.svg';
import './App.css';

const graphqlClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

// import navBar from './containers/navBar';

const App = () => {
  return (
    <ApolloProvider client={graphqlClient}>
      <BrowserRouter>
        <AuthProvider>
          <div className="App">
            <ButtonAppBar />
            <Switch>
              <Route path="/home" component={Home} />
              <PrivateRoute path="/userLocations" component={UserLocations} />
              <Route path="/signout" component={SignOut} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
