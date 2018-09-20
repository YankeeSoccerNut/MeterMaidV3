import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import ButtonAppBar from './components/ButtonAppBar';
import Home from './containers/Home';
import SignOut from './containers/SignOut';
import Dashboard from './containers/Dashboard';
import UserLocations from './containers/UserLocations';
import NotFound from './components/NotFound';

import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import logo from './logo.svg';
import './App.css';

const graphqlClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const App = () => {
  return (
    <ApolloProvider client={graphqlClient}>
      <BrowserRouter>
        <AuthProvider>
          <div className="App">
            <ButtonAppBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signout" component={SignOut} />
              <PrivateRoute path="/userLocations" component={UserLocations} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
