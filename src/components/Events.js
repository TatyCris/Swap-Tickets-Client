import React, { Component } from 'react'

export default class Events extends Component {  
    renderEvents = () => {
        return this.props.events.map(event => {
            return (
                <div key={event.id}>
                    <img className="event-image" src={event.pictureUrl} alt={event.name} />
                    <h3>{event.name}</h3>
                    {event.start === event.end ? event.start : <p>{event.start} - {event.end}</p>}
                </div>
            )
        })
    }

    render() {
        const { events } = this.props
        return (
            <div>
                {!events && 'Loading...'}
                {events && this.renderEvents()}
            </div>
        )
    }
}
