import * as request from 'superagent'
export const SET_EVENTS = 'SET_EVENTS'

function setEvents(events) {
    return {
        type: SET_EVENTS,
        payload: events
    }
}

export function getEvents() {
    return async function (dispatch) {
        request
            .get('http://localhost:4000/events')
            .then(response => {
                // console.log('events', response.body.events)
                dispatch(setEvents(response.body.events))
            })
            .catch(console.error)
    }
}