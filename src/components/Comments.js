import React, { Component } from 'react'

export default class Comments extends Component {
    renderComments = () => {
        return this.props.comments.map(comment => {
            return (
                    <div key={comment.id} className="comment-container">
                        <p className="author">{comment.author}</p>
                        <p className="text">{comment.text}</p>
                    </div>
            )
        })
    }

    render() {
        const { comments } = this.props

        return (
            <div className="comment-wrapper">
                {!comments && 'Loading...'}
                {comments && this.renderComments()}
            </div>
        )
    }
}
