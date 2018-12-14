import React, { Component } from 'react';

import Board from './Board';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div style={{margin: 'auto auto', display: 'inline-flex', flexDirection: 'column'}}>
        <Board />

      </div>
    );
  }
}

export default App;
