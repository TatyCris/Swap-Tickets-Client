import { SET_TICKETS, ADD_TICKET } from '../actions/tickets'

const initialState = []

export default function tickets(state = initialState, { type, payload }) {
    switch (type) {
        case SET_TICKETS:
            return payload
        case ADD_TICKET:
            return [...state, payload]
        default:
            return state
    }
}