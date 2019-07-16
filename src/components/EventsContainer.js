import React, { Component } from 'react'
import { connect } from 'react-redux'
import Events from './Events';
import { getEvents, postEvent } from '../actions/events'

class EventsContainer extends Component {
    state = {
        name: '',
        description: '',
        pictureUrl: '',
        start: '',
        end: '',
    }

    componentDidMount() {
        this.props.getEvents()
    }

    onChange = (event) => {
        const value = event.target.value
        const key = event.target.name

        this.setState({
            [key]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.props.postEvent(
            this.state.name,
            this.state.description,
            this.state.pictureUrl,
            this.state.start,
            this.state.end
        )
        this.setState({
            name: '',
            description: '',
            pictureUrl: '',
            start: '',
            end: ''
        })
    }

    renderFormCreate = () => {
        const { name } = this.state
        const { description } = this.state
        const { pictureUrl } = this.state

        return (
            <form onSubmit={this.onSubmit}>
                <h3>Add an event: </h3>
                <label>Name: </label>
                <input onChange={this.onChange} value={name} name="name"></input>
                <label>Description: </label>
                <input onChange={this.onChange} value={description} name="description"></input>
                <label>Image url: </label>
                <input onChange={this.onChange} value={pictureUrl} name="pictureUrl"></input>
                <label>Start date: </label>
                <input onChange={this.onChange} name="start" type="date"></input>
                <label>End date: </label>
                <input onChange={this.onChange} name="end" type="date"></input>

                <button>Add</button>
            </form>
        )
    }

    render() {
        return (
            <div>
                {this.renderFormCreate()}
                <Events events={this.props.events} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.events,
        token: state.token
    }
}

export default connect(mapStateToProps, { getEvents, postEvent })(EventsContainer)
