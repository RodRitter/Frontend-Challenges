import React, { useState, useEffect } from 'react'
import '../styles/main.scss'
import { connect } from "react-redux"
import { setJobData } from '../../redux/actions'
import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";
import Switch from '../components/Switch'

function Detail({ jobData }) {

    let history = useHistory()

    const [theme, setTheme] = useState(getLocalTheme())

    useEffect(() => {     
        document.title = 'Jobs Portal'
        console.log(jobData)
        if(jobData === null) {
            history.push('/github-jobs')
            return
        }
        
        return () => {
            setJobData(null)
        }
    }, [])

    function onThemeChange(toggle) {
        const newTheme = toggle ? 'dark' : 'light'
        window.localStorage.setItem('theme', newTheme)
        setTheme(newTheme)
    }

    function getLocalTheme() {
        const localTheme = window.localStorage.getItem('theme')
        if(localTheme) return localTheme
        return 'light'
    }

    const MainContent = () => (
        <div className={`github-jobs theme-${theme}`}>
            <header className="site-header">
                <div className="container">
                    <Link to="/github-jobs/"><h1>devjobs</h1></Link>

                    <div className="switch-container">
                        <div className="switch-control">
                            <div className="switch-icon left"></div>

                            <Switch
                                width={48}
                                height={24}
                                onChange={onThemeChange}
                                initialValue={theme === 'dark'}
                            />

                            <div className="switch-icon right"></div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="main-content container-narrow">

                <div className="company-details">
                    <div className="company-logo" style={{backgroundImage: `url("${jobData.company_logo}")`}}></div>

                    <div className="company-brand">
                        <div>
                            <h2>{jobData.company}</h2>
                            <a href={jobData.company_url} target="_blank" rel="noreferrer">{jobData.company_url}</a>
                        </div>
                    </div>

                    <div className="company-job-action">
                        <button className="btn alt" onClick={() => window.open(jobData.company_url, '_blank')}>Company Site</button>
                    </div>
                </div>

                <div className="job-info">
                    <div className="job-title-section">
                        <span className="job-meta-data">{jobData.created_at} • {jobData.type}</span>
                        <h2 className="job-title">{jobData.title}</h2>
                        <div className="job-location">{jobData.location}</div>
                        <button className="btn" onClick={() => window.open(jobData.company_url, '_blank')}>Apply Now</button>
                    </div>

                    <div dangerouslySetInnerHTML={{__html: jobData ? jobData.description : ''}}></div>
                
                </div>

                <div className="job-apply-info">
                    <h2>How To Apply</h2>
                    <div dangerouslySetInnerHTML={{__html: jobData ? jobData.how_to_apply : ''}}></div>
                </div>

            </div>

            
            <div className="job-footer">
                <div className="container-narrow">
                    <div className="job-title-section">
                        <h2 className="job-title">Frontend Developer</h2>
                        <span className="job-meta-data">Company Inc.</span>
                        <button className="btn" onClick={() => window.open(jobData.company_url, '_blank')}>Apply Now</button>
                    </div>
                </div>
            </div>
        </div>
    )

    return jobData ? <MainContent /> : null
}

const mapStateToProps = state => {
    return { jobData: state };
};


export default connect(
    mapStateToProps,
    { setJobData }
)(Detail);
