import axios from '../helpers/axios'
import {
    SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE,
    SIGNUP_REQUEST, SIGNUP_SUCCESS,
    SIGNUP_FAILURE, SIGNOUT_REQUEST, SIGNOUT_SUCCESS, SIGNOUT_FAILURE
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
        //const user = localStorage.getItem('user')
        //JSON.parse(user)
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
