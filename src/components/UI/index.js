import React from 'react'

const Input = ({ className, onChange, label, value, type, placeholder, errorMessage }) => {
    return (
        <>
            <div>
                <label>{label}</label>
                {errorMessage === '' ? null : <small className="error">{errorMessage}</small>}
            </div>

            <input
                className={className}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>
    )
}

export default Input
