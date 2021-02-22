import React from 'react'

export default function Input({ value, placeholder, onChange, onSubmit }) {
    return (
        <div className="form-input">
            <input value={value} placeholder={placeholder} onChange={onChange} type="text" />
            <button onClick={onSubmit}></button>
        </div>
    )
}
