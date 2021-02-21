import React, { useState, useEffect, useRef } from 'react'

const HANDLE_WIDTH = 40

export default function RangeSlider({ segments, onChange }) {

    const sliderRef = useRef(null)
    const handleRef = useRef(null)

    const [handlePos, setHandlePos] = useState(-HANDLE_WIDTH/2)
    const [progressPos, setProgressPos] = useState(0)
    const [data, setData] = useState(0)



    useEffect(() => {
        onChange({index: data, data: segments[data]})
        setProgressPos(getProgressPos(0))

        handleRef.current.addEventListener('mousedown', onHandleDown, false)
        window.addEventListener('mouseup', onHandleUp, false)

        return () => {
            handleRef.current.removeEventListener('mousedown', onHandleDown)
            window.removeEventListener('mouseup', onHandleUp)
            window.removeEventListener('mousemove', onHandleMove)
        }

    }, [])

    useEffect(() => {
        onChange({index: data, data: segments[data]})
    }, [data])


    function onHandleDown(event) {
        event.preventDefault()
        window.addEventListener('mousemove', onHandleMove, false)
    }

    function onHandleUp(event) {
        event.preventDefault()
        window.removeEventListener('mousemove', onHandleMove)
    }

    function onHandleMove(event) {
        event.preventDefault()
        const handlePosition = getClosestSegment(event)
        setHandlePos(handlePosition)
        setProgressPos(getProgressPos(handlePosition))
    }

    function getRelativeMousePos(event) {
        const mouseX = event.clientX
        const sliderLeft = sliderRef.current.offsetLeft
        const sliderWidth = sliderRef.current.offsetWidth
        const diff = mouseX - sliderLeft

        if(diff <= (-HANDLE_WIDTH/2)) {
            return -HANDLE_WIDTH/2
        } else if(diff >= sliderWidth - (HANDLE_WIDTH/2)) {
            return sliderWidth - (HANDLE_WIDTH/2)
        } else {
            return diff
        }
    }

    function getProgressPos(handlePosition) {
        const sliderWidth = sliderRef.current.offsetWidth
        return sliderWidth - handlePosition - (HANDLE_WIDTH/2)
    }

    function getSegmentWidth() {
        const sliderWidth = sliderRef.current.offsetWidth
        return sliderWidth / (segments.length - 1)
    }

    function getClosestSegment(event) {
        const mousePos = getRelativeMousePos(event)
        const sliderWidth = sliderRef.current.offsetWidth
        const segmentWidth = getSegmentWidth()

        const currSegment = Math.round((mousePos / sliderWidth) * (segments.length - 1))
        const segmentPos = currSegment * segmentWidth
        
        setData(Math.abs(currSegment))

        return segmentPos - (HANDLE_WIDTH / 2)
    }

    return (
        <div className="range-slider" ref={sliderRef}>
            <div className="range-slider-progress" style={{
                right: `${progressPos}px`
            }}></div>
            <div className="range-slider-handle" ref={handleRef} style={{
                left: `${handlePos}px`
            }}></div>
        </div>
    )
}
