import React, { Component } from 'react'
import './Modal.css'

export default class Modal extends Component {
    render() {
        if (this.props.openModal) {
            return (
                <div className="modal">
                    <div className="modal-main">
                        <button className="close" onClick={this.props.hideModal}>X</button>
                        {this.props.form()}
                    </div>
                </div>
            )
        }
        return null
    }
}
