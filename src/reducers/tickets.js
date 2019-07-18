import { SET_TICKETS, ADD_TICKET, UPDATE_TICKET } from '../actions/tickets'

const initialState = []

export default function tickets(state = initialState, { type, payload }) {
    switch (type) {
        case SET_TICKETS:
            return payload
        case ADD_TICKET:
            return [...state, payload]
        case UPDATE_TICKET:
            return [...state.filter(ticket => ticket.id !== payload.id), payload]
        default:
            return state
    }
}