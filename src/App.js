import React, { Component } from 'react'
import { Route } from "react-router-dom"
import LoguinContainer from './components/LoguinContainer';
import EventsContainer from './components/EventsContainer';
import TicketsContainer from './components/TicketsContainer';
import './App.css';

export default class App extends Component {
  baseUrl = 'http://localhost:4000'
  url = `${this.baseUrl}/rooms`


  render() {
    return (
      <div className="App">
        <main className="App-main">
          <Route exact path="/" component={LoguinContainer} />
          {/* <Route exact path="/" component={EventsContainer} /> */}
          <Route exact path="/events" component={EventsContainer} />
          <Route exact path="/events/:id/tickets" component={TicketsContainer} />
        </main>
      </div>
    )
  }
}