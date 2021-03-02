import React, { useState, useEffect } from 'react'

export default function Checkbox({ label, onChange }) {

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        onChange(checked)
    }, [])

    function toggle() {
        setChecked(!checked)
    }

    return (
        <div className="checkbox">
            <label className="cb-container">{label}
                <input type="checkbox" checked={checked} onClick={toggle} onChange={e => onChange(e.target.checked)} />
                <span className="cb-checkmark"></span>
            </label>
        </div>
    )
}
