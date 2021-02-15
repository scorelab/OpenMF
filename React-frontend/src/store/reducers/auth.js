import { LOGIN_USER, LOGIN_FAIL, REGISTER_USER, REGISTER_FAIL } from '../actions/auth'

const initialState = {
    user: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case LOGIN_USER:
    case REGISTER_USER:
        console.log(payload)
        return { ...state, user: payload }
    case LOGIN_FAIL:
    case REGISTER_FAIL:
        return { ...state, user: null }
    default:
        return state
    }
}
