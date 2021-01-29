import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../Header'

const Layout = (props) => {
    return (
        <>
            <Header />
            {
                props.sidebar ?
                    <div className="sidebar">
                        <ul>
                            <li className="sidebar__item"><NavLink className="sidebar__item-link" exact to={"/"}>Home</NavLink></li>
                            <li className="sidebar__item"><NavLink className="sidebar__item-link" to={"/category"}>Category</NavLink></li>
                            <li className="sidebar__item"><NavLink className="sidebar__item-link" to={"/products"}>Products</NavLink></li>
                            <li className="sidebar__item"><NavLink className="sidebar__item-link" to={"/orders"}>Orders</NavLink></li>
                            <li className="sidebar__item"><NavLink className="sidebar__item-link" to={"/users"}>Users</NavLink></li>
                        </ul>
                    </div>

                    :
                    props.children

            }
            {props.children}
        </>
    )
}

export default Layout

