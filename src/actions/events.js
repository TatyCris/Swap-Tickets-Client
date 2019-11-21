import * as request from 'superagent'
import { host } from '../constants'

export const SET_EVENTS = 'SET_EVENTS'
export const SET_EVENT = 'SET_EVENT'
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

function setEvent(event) {
    return {
        type: SET_EVENT,
        payload: event
    }
}

export function getEvents(offset) {
    return async function (dispatch) {
        request
            .get(`${host}/events`)
            .query({ offset })
            .then(response => {
                dispatch(setEvents(response.body))
            })
            .catch(err => alert(err))
    }
}

export function postEvent(name, description, pictureUrl, start, end) {
    return async function (dispatch) {
        request
            .post(`${host}/events`)
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
            .catch(err => alert(err))
    }
}

export function getEvent(id) {
    return async function (dispatch) {
        request
            .get(`${host}/events/${encodeURIComponent(id)}`)
            .then(response => {
                dispatch(setEvent(response.body))
            })
            .catch(err => alert(err))
    }
}