import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { signout } from '../../actions'

const Header = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleSignout = (e) => {
        e.preventDefault()
        dispatch(signout())
    }
    const renderSignedInLinks = () => {
        return (
            <li className="nav__item"><NavLink onClick={handleSignout} className="nav__item-link" to="/signout">Sign out</NavLink></li>
        )
    }

    const renderNonSignedInLinks = () => {
        return (
            <>
                <li className="nav__item"><NavLink className="nav__item-link" to="/signin">Sign in</NavLink></li>
                <li className="nav__item"><NavLink className="nav__item-link" to="/signup">Sign up</NavLink></li>
            </>
        )
    }
    return (
        <nav className="nav">
            <ul className="nav__list">
                {user.authenticate ? renderSignedInLinks() : renderNonSignedInLinks()}
            </ul>
        </nav>
    )
}

export default Header