import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Input from '../../components/UI'

const Orders = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        password: '',
        number: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedUser = formData
        console.log(updatedUser)
    }


    const renderUserData = () => {
        return (
            <form onSubmit={handleSubmit}>
                < Input
                    type="text"
                    label="FirstName"
                    placeholder="Enter user name"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                />
                < Input
                    type="text"
                    label="LastName"
                    placeholder="Enter user lastname"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                />
                < Input
                    type="email"
                    label="Email"
                    placeholder="Enter user email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
                < Input
                    type="text"
                    label="Role"
                    placeholder="Enter user role"
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                />
                < Input
                    type="password"
                    label="Password"
                    placeholder="Enter your name"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
                < Input
                    type="text"
                    label="Number"
                    placeholder="Enter user number"
                    value={formData.number}
                    onChange={e => setFormData({ ...formData, number: e.target.value })}
                />
                <button type="submit">Update</button>
            </form>
        )
    }
    return (
        <div className="home">
            <Layout sidebar>
                {renderUserData()}
            </Layout>
        </div>
    )
}

export default Orders
