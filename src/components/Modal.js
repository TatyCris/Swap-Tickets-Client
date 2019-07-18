import React, { Component } from 'react'
import './Modal.css'

export default class Modal extends Component {
    render() {
        console.log('propsmodal', this.props)
        if (this.props.openModal) {
            return (
                <div className="modal">
                    <div className="modal-main">
                        {this.props.form()}
                        <button onClick={this.props.hideModal}>X</button>
                    </div>
                </div>
            )
        }
        return null
    }
}
