import { USERS, LOG_OUT } from '../actions/users'
const initialState = {}

export default function user(state = initialState, { type, payload }) {
    switch (type) {
        case USERS:
            return payload
        case LOG_OUT:
            return {}
        default:
            return state
    }
}