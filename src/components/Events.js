import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Events.css'

export default class Events extends Component {
    // onClick = () => {
    //     return (
    //         <Link to={`/events/${event.id}/tickets`}></Link>)
    // }

    renderEvents = () => {
        return this.props.events.map(event => {
            return (
                <Link to={`/events/${event.id}/tickets`}>
                    <div key={event.id} className="event-container">
                        <img className="event-image" src={event.pictureUrl} alt={event.name} />
                        <h3>{event.name}</h3>
                        {event.start === event.end ? event.start : <p>{event.start} - {event.end}</p>}
                    </div>
                </Link >
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
