import { SET_DETAILS } from '../actions/tickets'

const initialState = ''

export default function tickets(state = initialState, { type, payload }) {
    switch (type) {
        case SET_DETAILS:
            return payload
        default:
            return state
    }
}