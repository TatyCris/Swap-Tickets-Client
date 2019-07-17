import React, { Component } from 'react'
import Tickets from './Tickets'
import { connect } from 'react-redux'
import { getTickets } from '../actions/tickets.js'


class TicketsContainer extends Component {
    id = this.props.match.params.id

    componentDidMount() {
        this.props.getTickets(this.id)
    }

    render() {
        console.log('props TicketsContainer', this.id);
        
        return (
            <div>
                <Tickets tickets={this.props.tickets}/>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        tickets: state.tickets
    }
}

export default connect(mapStatetoProps, { getTickets })(TicketsContainer)

