import React, { Component } from 'react'

export default class TicketDetails extends Component {
    renderDetails = () => {
        const { ticket } = this.props

        return (
            <div key={ticket.id} className="details-container">
                <p>Ticket from {ticket.author}</p>
                <p>Risk: x</p>
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
