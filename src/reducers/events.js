import { SET_EVENTS } from '../actions/events'
const initialState = []

export default function events(state = initialState, { type, payload }) {
    switch (type) {
        case SET_EVENTS:
            return payload
        default:
            return state
    }
}