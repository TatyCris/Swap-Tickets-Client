import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Tickets.css'

export default class Tickets extends Component {
    renderTickets = () => {
        return this.props.tickets.map(ticket => {
            return (
                <Link to={`/events/${ticket.eventId}/tickets/${ticket.id}`} key={ticket.id}>
                    <div key={ticket.id} className="ticket-container">
                        <p>{ticket.author}</p>
                        <p>{ticket.price} €</p>
                        <p>{ticket.description}</p>
                        {this.props.user.userId === ticket.userId ? <button>Delete</button> : null}
                    </div>
                </Link >
            )
        })
    }

    render() {
        const { tickets } = this.props

        return (
            <div>
                <div className="title">
                    <span>Seller</span>
                    <span>Price</span>
                    <span>Description</span>
                </div>
                {!tickets && 'Loading...'}
                {tickets && this.renderTickets()}
            </div>
        )
    }
}
