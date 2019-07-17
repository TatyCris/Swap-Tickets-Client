import React, { Component } from 'react'
import TicketDetails from './TicketDetails';
import { getDetails } from '../actions/tickets.js'
import { connect } from 'react-redux'

class TicketDetailsContainer extends Component {
    id = this.props.match.params.id
    ticketId = this.props.match.params.ticketId

    componentDidMount() {
        this.props.getDetails(this.id, this.ticketId)
    }

    render() {
        return (
            <div>
                <TicketDetails ticket={this.props.ticket}/>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        ticket: state.ticket
    }
}

export default connect(mapStatetoProps, { getDetails })(TicketDetailsContainer)
