import React, { Component } from 'react'
// import { Route } from "react-router-dom"
import './App.css';

export default class App extends Component {
  baseUrl = 'http://localhost:4000'
  url = `${this.baseUrl}/rooms`


  render() {
    return (
      <div className="App">
        <main className="App-main">
          {/* <Route exact path="/" component={} /> */}

        </main>
      </div>
    )
  }
}