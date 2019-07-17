import { SET_COMMENTS, ADD_COMMENT } from '../actions/comments'

const initialState = []

export default function comments(state = initialState, { type, payload }) {
    switch (type) {
        case SET_COMMENTS:
            return payload
        case ADD_COMMENT:
            return [payload, ...state]
        default:
            return state
    }
}