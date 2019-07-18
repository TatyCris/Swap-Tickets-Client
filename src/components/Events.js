import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Events.css'

export default class Events extends Component {
    renderEvents = () => {
        return this.props.events.map(event => {
            return (
                <Link to={`/events/${event.id}/tickets`} key={event.id}>
                    <div key={event.id} className="event-container">
                        <div className="event-image">
                            <img src={event.pictureUrl} alt={event.name} />
                        </div>
                        <div className="event-info">
                            <h3 className="event-text">{event.name}</h3>
                            <p className="event-text">{event.description}</p>
                            {event.start === event.end ? <p>{event.start}</p> : <p>{event.start} - {event.end}</p>}
                        </div>
                    </div>
                </Link >
            )
        })
    }

    render() {
        const { events } = this.props

        return (
            <div className="events-wrapper">
                {!events && 'Loading...'}
                {events && this.renderEvents()}
            </div>
        )
    }
}
