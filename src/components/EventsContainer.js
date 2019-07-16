import React, { Component } from 'react'
import { connect } from 'react-redux'
import Events from './Events';
import { getEvents } from '../actions/events'

class EventsContainer extends Component {
    componentDidMount() {
        this.props.getEvents()
    }

    

    render() {
        return (
            <div>
                <Events events={this.props.events}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.events
    }
}

export default connect(mapStateToProps, { getEvents })(EventsContainer)
