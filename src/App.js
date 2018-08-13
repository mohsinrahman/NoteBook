import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Authentication from './Authentication';

class App extends Component {
  render() {
    return (
      <div className="App">
        { /* <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div> */}
        <h1>Note Book</h1>
        <Authentication />
      </div>
    );
  }
}

export default App;
