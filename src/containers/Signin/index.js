import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import Input from '../../components/UI'
import { signin } from '../../actions'
import { Redirect } from 'react-router-dom'

const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailErr, setEmailErr] = useState([])
    const [passwordErr, setPasswordErr] = useState([])
    const [serverErr, setServerErr] = useState([])
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const error = useSelector(state => state.user.error)

    if (error) {
        if (!serverErr.includes(error) && error !== 'მითითებული ემაილი რეგისტრირებულია')
            serverErr.push(error)
    }
    const handleSignin = (e) => {
        e.preventDefault()
        const isValid = validateForm()
        const user = { email, password }
        if (isValid) {
            dispatch(signin(user))
        }
    }
    if (user.authenticate) {
        return <Redirect to="/" />
    }
    const validateForm = () => {
        const emailErr = []
        const passwordErr = []
        let isValid = true
        if (email === '') {
            emailErr.push('შეავსეთ ველი')
            isValid = false
        }
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            emailErr.push('არავალიდური ემაილი')
            isValid = false
        }
        if (password === '') {
            passwordErr.push('შეავსეთ ველი')
            isValid = false
        }
        if (password.length < 6) {
            passwordErr.push('ველი უნდა შეიცავდეს მინიმუმ 6 ასოს')
            isValid = false
        }
        setEmailErr(emailErr)
        setPasswordErr(passwordErr)
        return isValid
    }


    return (
        <div className="home">
            <Layout sidebar>
                <form onSubmit={handleSignin} className="form">
                    <small className="error">{serverErr}</small>
                    <Input className="form__input" errorMessage={emailErr[0]} type="text" label="Email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                    <Input className="form__input" errorMessage={passwordErr[0]} type="password" label="Password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="btn" type="submit">Sign in</button>
                </form>
            </Layout>
        </div>
    )
}

export default Signin
