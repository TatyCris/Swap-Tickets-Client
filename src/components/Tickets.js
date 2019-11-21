import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Tickets.css'

export default class Tickets extends Component {
    renderTickets = () => {
        return this.props.tickets.map(ticket => {
            return (
                <div key={ticket.id}>
                    <Link to={`/events/${ticket.eventId}/tickets/${ticket.id}`} key={ticket.id}>
                        <div className="ticket-container">
                            <p>{ticket.author}</p>
                            <p>{ticket.price === 0 ? "FREE" : ticket.price + '€' }</p>
                            <p>{ticket.description}</p>
                        </div>
                    </Link >
                    {
                        this.props.user.userId === ticket.userId
                            ?
                            <div className="button">
                                <button onClick={(e) => this.props.handleEdit(e, ticket)}>Edit</button>
                                {/* <button>Delete</button> */}
                            </div>
                            :
                            null
                    }
                </div>
            )
        })
    }

    render() {
        const { tickets } = this.props

        return (
            <div className="ticket-wrapper">
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