import { combineReducers } from 'redux'
import currentUser from './users' 
import events from './events'
import token from './token'

export default combineReducers({
    currentUser,
    events,
    token
})