import { combineReducers } from 'redux'
import currentUser from './users' 
import events from './events'
import tickets from './tickets'
import ticket from './ticket'
import comments from './comments'
import token from './token'

export default combineReducers({
    currentUser,
    events,
    tickets,
    ticket,
    comments,
    token
})