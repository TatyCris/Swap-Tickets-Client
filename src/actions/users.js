import * as request from 'superagent'
export const USERS = 'USERS'
export const TOKEN = 'TOKEN'

export function getUser(user) {
    return {
        type: USERS,
        payload: user
    }
}

export function getToken(token) {
    return {
        type: TOKEN,
        payload: token
    }
}

export function login(username, password) {
    return async function (dispatch) {
        request
            .post(`http://localhost:4000/login`)
            .send({ username, password })
            .then(res => {
                dispatch(getUser(username))
                dispatch(getToken(res.body.jwt))
            })
            .catch(console.error)
    }
}

export function signin(username, password) {
    return async function (dispatch) {
        request
            .post(`http://localhost:4000/users`)
            .send({ username, password })
            .then(res => {
                dispatch(getUser(username))
                dispatch(login(username, password))
            })
            .catch(console.error)
    }
}