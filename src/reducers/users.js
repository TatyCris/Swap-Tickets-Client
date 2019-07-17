import { USERS } from '../actions/users'
const initialState = {}

export default function user(state = initialState, { type, payload }) {
    switch (type) {
        case USERS:
            return payload
        default:
            return state
    }
}