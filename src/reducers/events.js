import { SET_EVENTS, ADD_EVENT } from '../actions/events'

const initialState = {
    events: [],
    total: 0
}

export default function events(state = initialState, { type, payload }) {
    switch (type) {
        case SET_EVENTS:
            return payload
        case ADD_EVENT:
            return {
                events: [...state.events, payload],
                total: state.total + 1
            }
        default:
            return state
    }
}