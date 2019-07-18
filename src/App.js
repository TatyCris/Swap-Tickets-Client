import React, { Component } from 'react'
import { Route } from "react-router-dom"
import  { connect } from 'react-redux'
import Header from './components/Header';
import EventsContainer from './components/EventsContainer';
import TicketsContainer from './components/TicketsContainer';
import TicketDetailsContainer from './components/TicketDetailsContainer';
import { authentication } from './actions/users' 
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.authentication()
  }

  render() {
    return (
      <div className="App">
        <header>
          <Header />
        </header>
        <main className="App-main">
          <Route exact path="/" component={EventsContainer} />
          <Route exact path="/events" component={EventsContainer} />
          <Route exact path="/events/:id/tickets" component={TicketsContainer} />
          <Route exact path="/events/:id/tickets/:ticketId" component={TicketDetailsContainer} />
        </main>
      </div>
    )
  }
}

export default connect(null, { authentication })(App)