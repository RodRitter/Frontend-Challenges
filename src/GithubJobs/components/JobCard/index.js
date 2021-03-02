import React from 'react'

export default function JobCard({ logo, created, type, title, company, location, onClick }) {
    return (
        <div className="job-card">

            <div className="job-company-logo" style={{
                backgroundImage: `url(${logo})`
            }}></div>

            <span className="job-meta-data">{created} • {type}</span>
            <h2 className="job-title" onClick={onClick}>{title}</h2>
            <h3 className="job-company">{company}</h3>
            <div className="job-location">{location}</div>
        </div>
    )
}
