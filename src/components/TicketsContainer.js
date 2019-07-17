import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tickets from './Tickets'
import Modal from './Modal'
import { getTickets, postTicket } from '../actions/tickets.js'
import './Tickets.css'

class TicketsContainer extends Component {
    state = {
        price: '',
        description: '',
        pictureUrl: '',
        openModal: false
    }

    id = this.props.match.params.id

    componentDidMount() {
        this.props.getTickets(this.id)
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
                    <h3>Add a ticket: </h3>
                    <label>Price: </label>
                    <input onChange={this.onChange} value={name} name="price"></input>
                    <label>Description: </label>
                    <input onChange={this.onChange} value={description} name="description"></input>
                    <label>Image url: </label>
                    <input onChange={this.onChange} value={pictureUrl} name="pictureUrl"></input>

                    <button>Add</button>
                </form>
            </div>
        )
    }

    render() {
        return (
            <div>
                <button onClick={this.showModal}>Create a ticket</button>
                <Tickets tickets={this.props.tickets}/>
                <Modal openModal={this.state.openModal} hideModal={this.hideModal} form={this.renderFormCreate} />
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        tickets: state.tickets
    }
}

export default connect(mapStatetoProps, { getTickets, postTicket })(TicketsContainer)