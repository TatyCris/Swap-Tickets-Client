import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment-business-time'
import TicketDetails from './TicketDetails';
import CommentsContainer from './CommentsContainer';
import { getDetails, getTickets } from '../actions/tickets.js'
import { getEvent } from '../actions/events'
import './TicketDetails.css'

class TicketDetailsContainer extends Component {
    id = this.props.match.params.id
    ticketId = this.props.match.params.ticketId

    componentDidMount() {
        this.props.getDetails(this.id, this.ticketId)
        this.props.getTickets(this.id)
        this.props.getEvent(this.id)
    }

    riskCalculator = () => {
        let risk = 0

        // -----1
        const ticketsFromThisUser = this.props.tickets
            .filter(ticket => ticket.userId === this.props.ticket.userId)

        if (ticketsFromThisUser.length === 1) {
            risk += 10
        }

        // -----2
        const ticketsForThisEvent = this.props.tickets
            .filter(ticket => ticket.eventId === this.props.ticket.eventId)
        const ticketsPrice = ticketsForThisEvent.map(event => event.price)
        const ticketPrice = this.props.ticket.price

        const priceAverage = (prices) => {
            return prices.reduce((total, curr) => {
                return total + curr
            }, 0) / prices.length
        }

        if (ticketPrice < priceAverage(ticketsPrice)) {
            risk += (priceAverage(ticketsPrice) - ticketPrice)
        } else {
            risk -= Math.min((ticketPrice - priceAverage(ticketsPrice)), 10)
        }

        // -----3
        moment.updateLocale('en', {
            workinghours: {
                0: ['09:00:00', '17:00:00'],
                1: ['09:00:00', '17:00:00'],
                2: ['09:00:00', '17:00:00'],
                3: ['09:00:00', '17:00:00'],
                4: ['09:00:00', '17:00:00'],
                5: ['09:00:00', '17:00:00'],
                6: ['09:00:00', '17:00:00']
            }
        })

        const createdAt = moment(this.props.ticket.created_at).format()

        if (moment(createdAt).isWorkingTime()) {
            risk -= 10
        }
        if (!moment(createdAt).isWorkingTime()) {
            risk += 10
        }

        // -----4
        const commentsForThisTiket = this.props.comments

        if (commentsForThisTiket.length > 3) {
            risk += 5
        }

        // -----5
        
        if (risk < 5) {
            return risk = 5
        } else if (risk > 95) {
            return risk = 95
        } else {
            return risk
        }
    }

    renderRisk = () => {
        if (this.riskCalculator() < 36) {
            return <p className="risk" style={{backgroundColor: 'green'}}>Risk: {this.riskCalculator()}%</p>
        } else if (this.riskCalculator() < 66) {
            return <p className="risk" style={{backgroundColor: 'yellow'}}>Risk: {this.riskCalculator()}%</p>
        } else {
            return <p className="risk" style={{backgroundColor: 'red'}}>Risk: {this.riskCalculator()}%</p>
        }
    }

    render() {
        return (
            <div>
                <TicketDetails ticket={this.props.ticket} eventName={this.props.event} risk={this.renderRisk} />
                <CommentsContainer id={this.id} ticketId={this.ticketId} />
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        tickets: state.tickets,
        ticket: state.ticket,
        comments: state.comments,
        event: state.event.name
    }
}

export default connect(mapStatetoProps, { getDetails, getTickets, getEvent })(TicketDetailsContainer)
