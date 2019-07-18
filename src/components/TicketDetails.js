import React, { Component } from 'react'

export default class TicketDetails extends Component {
    renderDetails = () => {
        const { ticket } = this.props

        return (
            <div key={ticket.id} className="details-container">
                <h3>{this.props.eventName}</h3>
                <p>Ticket from {ticket.author}</p>
                {this.props.risk()}
                <p>EUR {ticket.price}</p>
                <img className="ticket-image" src={ticket.pictureUrl} alt="ticket" />
                <p>{ticket.description}</p>
            </div>
        )
    }

    render() {
        const { ticket } = this.props

        return (
            <div>
                {!ticket && 'Loading...'}
                {ticket && this.renderDetails()}
            </div>
        )
    }
}
