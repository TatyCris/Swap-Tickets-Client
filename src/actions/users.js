export const USERS = 'USERS'

export function getUser(user) {

    return {
        type: USERS,
        payload: user
    }
}