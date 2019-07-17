import React, { Component } from 'react'

export default class Comments extends Component {
    renderComments = () => {
        return this.props.comments.map(comment => {
            return (
                    <div key={comment.id} className="comment-container">
                        <p>{comment.author}</p>
                        <p>{comment.text}</p>
                    </div>
            )
        })
    }

    render() {
        const { comments } = this.props

        return (
            <div>
                {!comments && 'Loading...'}
                {comments && this.renderComments()}
            </div>
        )
    }
}
