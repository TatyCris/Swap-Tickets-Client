import React, { Component } from 'react'

export default class Events extends Component {
    renderEvents = () => {
        return this.props.events.map(event => {
            return (
                <div>
                    <img className="event-image" src={event.pictureUrl} alt={event.name} />
                    <h3>{event.name}</h3>
                    {event.start === event.end ? event.start : <p>{event.start} - {event.end}</p>}
                </div>
            )
        })
    }

    renderFormCreate = () => {
        return (
            <form onSubmit={this.onSubmit}>
                <label>Add an event: </label>
                <label>Name: </label>
                <input onChange={this.onChange} value={this.state.value} name={this.state.value}></input>
                <label>Description: </label>
                <input onChange={this.onChange} value={this.state.value} name={this.state.value}></input>
                <label>Picture url: </label>
                <input onChange={this.onChange} value={this.state.value} name={this.state.value}></input>
                <label>Start date: </label>
                <input onChange={this.onChange} value={this.state.value} name={this.state.value} type="date"></input>
                <label>End date: </label>
                <input onChange={this.onChange} value={this.state.value} name={this.state.value} type="date"></input>

                <button>Add</button>
            </form>
        )
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
