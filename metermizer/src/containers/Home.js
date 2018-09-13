import React, { Component } from 'react';

// import Login from '../components/Login';
// import Register from '../components/Register';
import getAllReadings from '../utils/getAllReadings';

class Home extends Component {
  componentDidMount() {
    getAllReadings().then(results =>
      console.log('componentDidMount results: ', results)
    );
  }

  render() {
    return (
      <div id="homecontainer">
        <h1>Homepage Placeholder</h1>
      </div>
    );
  }
}

export default Home;
