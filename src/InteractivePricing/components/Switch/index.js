import React, { useState } from 'react'

const HANDLE_PADDING = 4;

export default function Switch({ width, height, onChange, initialValue }) {
    
    const [toggled, setToggled] = useState(initialValue);

    function toggleSwitch() {
        onChange(!toggled);
        setToggled(!toggled);
    }

    return (
        <div className="switch" 
        onClick={toggleSwitch}    
        style={{
            height: `${ height }px`,
            width: `${ width }px`
        }}>
            <div className="toggle" style={{
                width: `${ height-(HANDLE_PADDING*2) }px`,
                height:`${ height-(HANDLE_PADDING*2) }px`,
                top: `${ HANDLE_PADDING }px`,
                left: toggled ? `${ (width-HANDLE_PADDING)-(height-(HANDLE_PADDING*2)) }px` : `${ HANDLE_PADDING }px`,
            }}></div>
        </div>
    )
}
