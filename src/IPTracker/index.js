import React, { useState, useEffect } from 'react'
import './styles/main.scss'

import Input from './components/Input'
import LeafletMap from './components/LeafletMap'
import axios from 'axios';

const IP_API = 'https://geo.ipify.org/api/v1?apiKey=at_rNEgnHJcb28WhdHHZwu4JtenM8Pi2'

export default function IPTracker() {

    const [loading, setLoading] = useState(false)
    const [ipSearch, setIPSearch] = useState('')
    const [ipData, setIPData] = useState(null)

    useEffect(() => {     
        document.title = 'IP Address Tracker'
        fetchIP();
    }, [])

    function fetchIP(ipAddress) {
        if(!loading) {
            const ip = ipAddress ? `&ipAddress=${ipAddress}` : '';
            setLoading(true)

            axios.get(`${IP_API}${ip}`)
            .then(res => {
                if(res) setIPData(res.data)
            })
            .finally(() => setLoading(false))
        }
    }

    const IPInfo = () => {

        const { ip, location: { city, region, country, timezone }, isp } = ipData;

        return (
            <div className="ip-info">
                <div>
                    <h2>IP Address</h2>
                    <span>{ ip }</span>
                </div>
                
                <div>
                    <h2>Location</h2>
                    <span>{ `${ city }, ${ region }, ${ country }` }</span>
                </div>
                
                <div>
                    <h2>Timezone</h2>
                    <span>UTC { timezone }</span>
                </div>
                
                <div>
                    <h2>ISP</h2>
                    <span>{ isp }</span>
                </div>
            </div>
        )
    }

    const Loader = () => (
        <div className="ip-info">
            <div className="loader">
                <h2>Fetching IP Info...</h2>
            </div>
        </div>
    )

    return (
        <div className="ip-tracker">
            <section className="top-section">
                <h1>IP Address Tracker</h1>

                <Input
                    placeholder='Search for any IP address or domain'
                    onChange={e => setIPSearch(e.target.value)}
                    onSubmit={() => fetchIP(ipSearch)} />

                {loading || !ipData ? <Loader /> : <IPInfo />}
            </section>

            <section className="bottom-section">
                <LeafletMap coords={ ipData ? [ipData.location.lat, ipData.location.lng] : null } />
            </section>
        </div>
    )
}
