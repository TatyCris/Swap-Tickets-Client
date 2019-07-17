import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tickets from './Tickets'
import Modal from './Modal'
import { getTickets, postTicket, changeTicket } from '../actions/tickets.js'
import { getEvent } from '../actions/events'
import './Tickets.css'

class TicketsContainer extends Component {
    state = {
        price: '',
        description: '',
        pictureUrl: '',
        edit: false,
        openModal: false
    }

    id = this.props.match.params.id

    componentDidMount() {
        this.props.getTickets(this.id)
        this.props.getEvent(this.id)
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
        this.props.postTicket(
            this.state.price,
            this.state.description,
            this.state.pictureUrl
        )
        this.setState({
            price: '',
            description: '',
            pictureUrl: ''
        })
    }

    submitChange = (event) => {
        event.preventDefault()
        this.props.changeTicket(
            // id,
            // ticketId,
            this.state.price,
            this.state.description,
            this.state.pictureUrl
        )
        this.setState({
            price: '',
            description: '',
            pictureUrl: '',
        })
    }

    showModal = () => {
        this.setState({ openModal: true })
    }

    hideModal = () => {
        this.setState({ openModal: false })
    }

    handleCreate = (event) => {
        event.preventDefault()
        this.setState({
            price: '',
            description: '',
            pictureUrl: '',
            edit: false
        })
        this.showModal()
    }

    handleEdit = (event, ticket) => {
        event.preventDefault()
        this.setState({
            price: ticket.price,
            description: ticket.description,
            pictureUrl: ticket.pictureUrl,
            edit: true
        }) 
        this.showModal()
    }

    renderFormCreate = () => {
        const { price } = this.state
        const { description } = this.state
        const { pictureUrl } = this.state

        const onSubmit = this.state.edit ? this.submitChange : this.onSubmit
        const title = this.state.edit ? 'Edit ticket' : 'Create ticket'
        const buttonTitle = this.state.edit ? 'Save' : 'Add'

        return (
            <div>
                <form onSubmit={onSubmit} className="form-create">
                    <h3>{title}</h3>
                    <label>Price: </label>
                    <input onChange={this.onChange} value={price} name="price"></input>
                    <label>Description: </label>
                    <input onChange={this.onChange} value={description} name="description"></input>
                    <label>Image url: </label>
                    <input onChange={this.onChange} value={pictureUrl} name="pictureUrl"></input>

                    <button>{buttonTitle}</button>
                </form>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h3>{this.props.event.name}</h3>
                <button onClick={this.handleCreate}>Create a ticket</button>
                <Tickets
                    tickets={this.props.tickets}
                    user={this.props.user}
                    handleEdit={this.handleEdit}
                />
                <Modal
                    openModal={this.state.openModal}
                    hideModal={this.hideModal}
                    form={this.renderFormCreate}
                />
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        tickets: state.tickets,
        event: state.event,
        user: state.currentUser
    }
}

export default connect(mapStatetoProps, { getTickets, postTicket, getEvent, changeTicket })(TicketsContainer)