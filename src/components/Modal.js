import React, { Component } from 'react'
import './Modal.css'

export default class Modal extends Component {
    render() {
        if (this.props.openModal) {
            return (
                <div className="modal">
                    <div className="modal-main">
                        {this.props.form()}
                    </div>
                </div>
            )
        }
        return null
    }
}
