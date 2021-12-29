import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';

export class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <News
          pageSize={3}
          country="de"
          category="business" />
      </div>
    )
  }
}

export default App;

