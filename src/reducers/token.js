import { TOKEN } from '../actions/users'
const initialState = ''

export default function events(state = initialState, { type, payload }) {
    switch (type) {
        case TOKEN:
            return payload
        default:
            return state
    }
}