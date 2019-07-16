import { combineReducers } from 'redux'
import currentUser from './users' 
import events from './events'

export default combineReducers({
    currentUser,
    events
})