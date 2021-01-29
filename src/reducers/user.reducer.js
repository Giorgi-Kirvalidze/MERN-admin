import { SIGNUP_SUCCESS, SIGNUP_REQUEST, SIGNUP_FAILURE, SIGNIN_FAILURE, SIGNIN_SUCCESS, SIGNIN_REQUEST, SIGNOUT_REQUEST, SIGNOUT_FAILURE, SIGNOUT_SUCCESS, GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from '../actions/types'

const initState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        number: '',
        role: ''
    },
    message: '',
    loading: false,
    authenticate: false,
    authenticating: false,
    error: null,
    users: [],
    getUser: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        number: '',
        role: ''
    }
}

export default (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case SIGNUP_REQUEST:
            state = { ...state, loading: true }
            break
        case SIGNUP_SUCCESS:
            state = { ...state, loading: false, authenticate: true, authenticating: false, message: action.payload.message, token: action.payload.token, error: null }
            break
        case SIGNUP_FAILURE:
            state = { ...state, loading: false, error: action.payload.error }
            break
        case SIGNIN_REQUEST:
            state = { ...state, authenticating: true, authenticate: false }
            break
        case SIGNIN_SUCCESS:
            state = { ...state, authenticating: false, authenticate: true, user: action.payload.user, token: action.payload.token, error: null }
            break
        case SIGNIN_FAILURE:
            state = { ...state, error: action.payload.error, message: action.payload.message }
            break
        case SIGNOUT_REQUEST:
            state = { ...state, loading: true }
            break
        case SIGNOUT_SUCCESS:
            state = { ...initState }
            break
        case SIGNOUT_FAILURE:
            state = { ...state, error: action.payload.error, loading: false }
            break
        case GET_USERS_REQUEST:
            state = { ...state, loading: true, }
            break
        case GET_USERS_SUCCESS:
            state = { ...state, loading: false, users: action.payload.users }
            break
        case GET_USERS_FAILURE:
            state = { ...state, loading: false }
            break
        case GET_USER_REQUEST:
            state = { ...state, loading: true }
            break
        case GET_USER_SUCCESS:
            state = { ...state, loading: false, getUser: action.payload.user }
            break
        case GET_USER_FAILURE:
            state = { ...state, loading: false }
            break
        case UPDATE_USER_SUCCESS:

            const users = state.users.map((user) => user._id === action.payload.updatedUser._id ? action.payload.updatedUser : user)
            state = { ...state, users }
    }
    return state
}