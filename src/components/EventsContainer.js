import React, { Component } from 'react'
import { connect } from 'react-redux'
import Events from './Events';
import Modal from './Modal'
import { getEvents, postEvent } from '../actions/events'
import './Events.css'

class EventsContainer extends Component {
    state = {
        name: '',
        description: '',
        pictureUrl: '',
        start: '',
        end: '',
        openModal: false
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

    showModal = () => {
        this.setState({ openModal: true })
    }

    hideModal = () => {
        this.setState({ openModal: false })
    }

    renderFormCreate = () => {
        const { name } = this.state
        const { description } = this.state
        const { pictureUrl } = this.state

        return (
            <div>
                <form onSubmit={this.onSubmit} className="form-create">
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
            </div>
        )
    }

    render() {
        return (
            <div>
                <button onClick={this.showModal}>Create an event</button>
                <Events events={this.props.events} />
                <Modal openModal={this.state.openModal} hideModal={this.hideModal} form={this.renderFormCreate} />
                <button>Previous</button>
                <button>Next</button>
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
