import * as request from 'superagent'
export const USERS = 'USERS'
export const TOKEN = 'TOKEN'
export const LOG_OUT = 'LOG_OUT'

export function setUser(user) {
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
                localStorage.setItem('token', res.body.jwt)
                dispatch(authentication())
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
                localStorage.setItem('token', res.body.jwt)
                dispatch(authentication())
                dispatch(login(username, password))
            })
            .catch(console.error)
    }
}

export function authentication() {
    return async function (dispatch) {
        request
            .get(`http://localhost:4000/authentication`)
            .set({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.token })
            .then(response => {
                dispatch(setUser(response.body))
            })
            .catch(err => console.log(err))
    }
}

export function logout() {
    return async function (dispatch) {
        dispatch({
            type: LOG_OUT
        })
    }
}