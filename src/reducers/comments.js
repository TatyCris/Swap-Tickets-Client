import { SET_COMMENTS, ADD_COMMENT } from '../actions/comments'

const initialState = []

export default function comments(state = initialState, { type, payload }) {
    switch (type) {
        case SET_COMMENTS:
            return payload
        case ADD_COMMENT:
            return [...state, payload]
        default:
            return state
    }
}