import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comments from './Comments'
import { getComments, postComment } from '../actions/comments'
import './Comments.css'

class CommentsContainer extends Component {
    state = {
        text: '',
        openModal: false
    }

    id = this.props.id
    ticketId = this.props.ticketId

    componentDidMount() {
        this.props.getComments(this.id, this.ticketId)
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
        this.props.postComment(this.id, this.ticketId, this.state.text)
        this.setState({
            text: ''
        })
    }

    renderFormCreate = () => {
        const { text } = this.state

        return (
            <div>
                <form onSubmit={this.onSubmit} className="form-create">
                    <label>Comment </label>
                    <textarea
                        onChange={this.onChange}
                        value={text}
                        name="text"
                        rows="8"
                        cols="80"
                    >
                    </textarea>
                    <button>Add comment</button>
                </form>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderFormCreate()}
                <Comments comments={this.props.comments} />
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        comments: state.comments
    }
}

export default connect(mapStatetoProps, { getComments, postComment })(CommentsContainer)
