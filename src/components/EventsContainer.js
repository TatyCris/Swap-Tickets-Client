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

    offset = 0

    componentDidMount() {
        this.props.getEvents(0)
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

    pagination = (previous) => {
        if (previous) {
            if (this.offset > 0) {
                this.offset -= 9
                this.props.getEvents(this.offset)
            }
        } else {
            if (this.offset < this.props.total - 9) {
                this.offset += 9
                this.props.getEvents(this.offset);
            }
        }

    }

    render() {
        return (
            <div className="events-container">
                <div className="create-title" onClick={this.showModal}>
                    <h2>Create new event</h2>
                </div>
                <div>
                    <Events events={this.props.events} />
                    <Modal openModal={this.state.openModal} hideModal={this.hideModal} form={this.renderFormCreate} />
                    <div className="pagination">
                        <button onClick={() => this.pagination(true)}>{'<'} </button>
                        <button onClick={() => this.pagination(false)}>{'>'} </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.events.events,
        total: state.events.total
    }
}

export default connect(mapStateToProps, { getEvents, postEvent })(EventsContainer)
