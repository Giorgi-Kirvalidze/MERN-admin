import axios from '../helpers/axios'
import {
    SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE,
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    SIGNOUT_REQUEST, SIGNOUT_SUCCESS, SIGNOUT_FAILURE,
    GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS, GET_USER_SUCCESS, GET_USER_REQUEST, GET_USER_FAILURE
} from '../actions/types'



export const signup = user => async dispatch => {
    console.log(user)
    dispatch({ type: SIGNUP_REQUEST })
    try {
        const res = await axios.post('/users/signup', user)
        if (res.status === 201) {
            const { message, token } = res.data
            localStorage.setItem('token', token)
            dispatch({ type: SIGNUP_SUCCESS, payload: { message: message, token: token } })
        } else {
            if (res.status === 400) {
                dispatch({ type: SIGNUP_FAILURE, payload: { message: res.data.message } })
            }
        }
    } catch (error) {
        dispatch({ type: SIGNUP_FAILURE, payload: { error: error.response.data.message } })
    }
}

export const signin = user => async dispatch => {
    console.log(user)
    dispatch({ type: SIGNIN_REQUEST })
    try {
        const res = await axios.post('users/signin', user)
        if (res.status === 200) {
            const { token, user } = res.data
            JSON.stringify(user)
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            dispatch({ type: SIGNIN_SUCCESS, payload: { user, token } })
        } else {
            if (res.status === 400) {
                const { message } = res.data
                dispatch({ type: SIGNIN_FAILURE, payload: { message: message } })
            }
        }
    } catch (error) {
        dispatch({ type: SIGNIN_FAILURE, payload: { error: error.response.data.message } })
    }


}

export const isUserSignedIn = () => async dispatch => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user')
    if (token) {
        dispatch({
            type: SIGNIN_SUCCESS,
            payload: {
                token, user
            }
        });
    } else {
        dispatch({
            type: SIGNIN_FAILURE,
            payload: ''
        });
    }

}

export const signout = () => async dispatch => {
    dispatch({ type: SIGNOUT_REQUEST })
    const res = await axios.post('users/signout')
    if (res.status === 200) {
        localStorage.clear()
        dispatch({ type: SIGNOUT_SUCCESS, payload: res.data.message })
    } else {
        dispatch({ type: SIGNOUT_FAILURE, payload: res.data.message })
    }
}

export const getUsers = () => async dispatch => {
    dispatch({ type: GET_USERS_REQUEST })
    try {
        const res = await axios.get('users')
        if (res.status === 200) {
            dispatch({ type: GET_USERS_SUCCESS, payload: { users: res.data } })
        } else {
            if (res.status === 400) {
                dispatch({ type: GET_USERS_FAILURE, payload: { error: res.data.error } })
            }
        }
    } catch (error) {
        dispatch({ type: GET_USERS_FAILURE, payload: { error: error.response.data.message } })
    }
}
export const updateUser = (id, updatedUser) => async dispatch => {
    dispatch({ type: UPDATE_USER_REQUEST })
    const res = await axios.patch(`users/${id}`, updatedUser)
    if (res.status === 200) {
        dispatch({ type: UPDATE_USER_SUCCESS, payload: { updatedUser: res.data.updateUser } })
    } else {
        dispatch({ type: UPDATE_USER_FAILURE })
    }
}

export const getUser = (id) => async dispatch => {
    // dispatch({ type: GET_USER_REQUEST })
    const res = await axios.get(`users/${id}`)
    if (res.status === 200) {
        const { user } = res.data
        dispatch({ type: GET_USER_SUCCESS, payload: { user: user } })
    } else {
        if (res.status === 400) {
            dispatch({ type: GET_USER_FAILURE, payload: { error: res.data.error } })
        }
    }
}
