import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Input from '../../components/UI'
import { signup } from '../../actions'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Signup = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [number, setNumber] = useState('')
    const [firstNameErr, setFirstNameErr] = useState([])
    const [lastNameErr, setLastNameErr] = useState([])
    const [emailErr, setEmailErr] = useState([])
    const [passwordErr, setPasswordErr] = useState([])
    const [numberErr, setNumberErr] = useState([])
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const error = useSelector(state => state.user.error)


    if (error) {
        emailErr.push(error)
    }

    useEffect(() => {
        if (!user.loading) {
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setNumber('')
        }
    }, [user.loading]);

    if (user.authenticate) {
        return <Redirect to="/" />
    }
    if (user.loading) {
        <p>Loading...</p>
    }
    const handleSignup = (e) => {
        e.preventDefault()
        const isValid = validateForm()
        const user = {
            firstName,
            lastName,
            email,
            password,
            number
        }
        if (isValid) {
            dispatch(signup(user));
        }
    }
    const validateForm = () => {
        const firstNameErr = []
        const lastNameErr = []
        const emailErr = []
        const passwordErr = []
        const numberErr = []
        let isValid = true
        if (firstName === '') {
            firstNameErr.push('შეავსეთ ველი.')
            isValid = false
        }
        if (!firstName.match("^[a-zA-Z]+$")) {
            firstNameErr.push('ველი უნდა შეიცავდეს მხოლოდ ასოებს.')
            isValid = false
        }
        if (firstName.length > 8) {
            firstNameErr.push('სახელი არ შეიძლება შეიცავდეს 8ზე მეტ ასოს')
            isValid = false
        }
        if (lastName === '') {
            lastNameErr.push('შეავსეთ ველი')
            isValid = false
        }
        if (!lastName.match("^[a-zA-Z]+$")) {
            lastNameErr.push('ველი უნდა შეიცავდეს მხოლოდ ასოებს.')
            isValid = false
        }
        if (lastName.length < 5) {
            lastNameErr.push('ველი უნდა შეიცავდეს მინიმუმ 5 ასოს')
            isValid = false
        }
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
        if (number === '') {
            numberErr.push('შეავსეთ ველი')
            isValid = false
        }
        if (!/^\d+$/.test(number)) {
            numberErr.push('ველი უნდა შეიცავდეს მხოლოდ ციფრებს')
            isValid = false
        }
        if (number.length !== 9) {
            numberErr.push('ველი უნდა შეიცავდეს მხოლოდ 9 ციფრს')
            isValid = false
        }
        setLastNameErr(lastNameErr)
        setFirstNameErr(firstNameErr)
        setEmailErr(emailErr)
        setPasswordErr(passwordErr)
        setNumberErr(numberErr)
        return isValid
    }

    return (
        <div className="home">
            <Layout sidebar>
                <form onSubmit={handleSignup} className="signup">
                    <Input errorMessage={firstNameErr[0]} className="signup__input" type="text" label="FirstName" placeholder="Enter your name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <Input errorMessage={lastNameErr[0]} className="signup__input" type="text" label="LastName" placeholder="Enter your lastname" value={lastName} onChange={e => setLastName(e.target.value)} />
                    <Input errorMessage={emailErr[0]} className="signup__input" type="text" label="Email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                    <Input errorMessage={passwordErr[0]} className="signup__input" type="password" label="Password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                    <Input errorMessage={numberErr[0]} className="signup__input" type="text" label="Number" placeholder="Enter your number" value={number} onChange={e => setNumber(e.target.value)} />
                    <button className="btn" type="submit">Sign in</button>
                </form>
            </Layout>
        </div>
    )
}

export default Signup