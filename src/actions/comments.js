import * as request from 'superagent'
import { host } from '../constants'

export const SET_COMMENTS = 'SET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'

function setComments(comments) {
    return {
        type: SET_COMMENTS,
        payload: comments
    }
}

function addComment(comment) {
    return {
        type: ADD_COMMENT,
        payload: comment
    }
}

export function getComments(id, ticketId) {
    return async function (dispatch) {
        request
            .get(`${host}/events/${encodeURIComponent(id)}/tickets/${encodeURIComponent(ticketId)}/comments`)
            .then(response => {
                dispatch(setComments(response.body))
            })
            .catch(err => alert(err))
    }
}

export function postComment(id, ticketId, text) {
    return async function (dispatch) {
        request
            .post(`${host}/events/${encodeURIComponent(id)}/tickets/${encodeURIComponent(ticketId)}/comments`)
            .set({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.token })
            .send({
                text: text
            })
            .then(response => {
                dispatch(addComment(response.body))
            })
            .catch(err => alert(err))
    }
}