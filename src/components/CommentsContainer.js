import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comments from './Comments'
import { getComments } from '../actions/comments'

class CommentsContainer extends Component {
    id = this.props.id
    ticketId = this.props.ticketId

    componentDidMount() {
        this.props.getComments(this.id, this.ticketId)
    }

    render() {
        console.log('props', this.props);
        
        return (
            <div>
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

export default connect(mapStatetoProps, { getComments })(CommentsContainer)
