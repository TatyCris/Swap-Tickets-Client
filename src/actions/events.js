import * as request from 'superagent'
export const SET_EVENTS = 'SET_EVENTS'
export const ADD_EVENT = 'ADD_EVENT'

function setEvents(events) {
    return {
        type: SET_EVENTS,
        payload: events
    }
}

function addEvent(event) {
    return {
        type: ADD_EVENT,
        payload: event
    }
}

export function getEvents() {
    return async function (dispatch) {
        request
            .get('http://localhost:4000/events')
            .then(response => {
                dispatch(setEvents(response.body.events))
            })
            .catch(console.error)
    }
}

export function postEvent(name, description, pictureUrl, start, end) {
    return async function (dispatch) {
        request
            .post(`http://localhost:4000/events`)
            .set({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.token })
            .send({
                name: name,
                description: description,
                pictureUrl: pictureUrl,
                start: start,
                end: end
            })
            .then(response => {
                dispatch(addEvent(response.body))
            })
            .catch(err => console.log(err))
    }
}