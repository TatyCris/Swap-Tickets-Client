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