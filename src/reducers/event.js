import { SET_EVENT } from '../actions/events'

const initialState = {}

export default function event(state = initialState, { type, payload }) {
    switch (type) {
        case SET_EVENT:
            return payload
        default:
            return state
    }
}