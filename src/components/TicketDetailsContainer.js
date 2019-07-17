import React, { Component } from 'react'
import { connect } from 'react-redux'
import TicketDetails from './TicketDetails';
import CommentsContainer from './CommentsContainer';
import { getDetails } from '../actions/tickets.js'

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
                <CommentsContainer id={this.id} ticketId={this.ticketId} />
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
