import * as request from 'superagent'
export const SET_TICKETS = 'SET_TICKETS'
export const ADD_TICKET = 'ADD_TICKET'
export const SET_DETAILS = 'SET_DETAILS'

function setTickets(tickets) {
    return {
        type: SET_TICKETS,
        payload: tickets
    }
}

function addTicket(ticket) {
    return {
        type: ADD_TICKET,
        payload: ticket
    }
}

function setDetails(details) {
    return {
        type: SET_DETAILS,
        payload: details
    }
}

export function getTickets(id) {
    return async function (dispatch) {
        request
            .get(`http://localhost:4000/events/${encodeURIComponent(id)}/tickets`)
            .then(response => {
                dispatch(setTickets(response.body))
            })
            .catch(console.error)
    }
}

export function postTicket(id, pictureUrl, price, description) {
    return async function (dispatch) {
        request
            .post(`http://localhost:4000/events/${id}/tickets`)
            .set({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.token })
            .send({
                pictureUrl: pictureUrl,
                price: price,
                description: description
            })
            .then(response => {
                dispatch(addTicket(response.body))
            })
            .catch(err => console.log(err))
    }
}

export function getDetails(id, ticketId) {
    return async function (dispatch) {
        request
            .get(`http://localhost:4000/events/${encodeURIComponent(id)}/tickets/${encodeURIComponent(ticketId)}`)
            .then(response => {
                dispatch(setDetails(response.body))
            })
            .catch(console.error)
    }
}