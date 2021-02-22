import React, { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'


export default function LeafletMap({ coords }) {

    
    const [position, setPosition] = useState([0,0])
    const [zoomLevel, setZoomLevel] = useState(3)

    useEffect(() => {
        if(coords) {
            setPosition(coords)
            setZoomLevel(12)
        } else {
            setPosition([0,0])
            setZoomLevel(3)
        }
    }, [coords])



    const flyToRef = useRef(null)
    function FlyTo({ position, zoomLevel }) {
        const map = useMap()

        useEffect(() => {
            map.setView(position, zoomLevel, {
                animate: true,
                speed: 2,
            })
        }, [position])

        return null
    }

    return (
        <div className='leaflet-map'>
            <MapContainer center={position} zoom={zoomLevel} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}></Marker>
                <FlyTo ref={flyToRef} position={position} zoomLevel={zoomLevel} />
            </MapContainer>
        </div>
    )
}
