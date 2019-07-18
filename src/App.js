import React, { Component } from 'react';
import './App.css';
import AppEmployees from './containers/AppEmployees'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppEmployees />
      </div>
    );
  }
}

export default App;
