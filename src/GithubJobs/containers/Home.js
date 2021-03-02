import React, { useState, useEffect } from 'react'
import '../styles/main.scss'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { useDispatch, connect } from "react-redux"
import { setJobData } from '../../redux/actions'
import Switch from '../components/Switch'
import Checkbox from '../components/Checkbox'
import JobCard from '../components/JobCard'

const CORS_ANYWHERE = 'https://ritter-cors-anywhere.herokuapp.com/'
const GITHUB_API_BASE = 'https://jobs.github.com/positions.json'

function Home({ jobData }) {
    let history = useHistory();
    let dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [theme, setTheme] = useState(getLocalTheme())
    const [query, setQuery] = useState('')
    const [location, setLocation] = useState('')
    const [fulltime, setFulltime] = useState(false)
    const [jobsData, setJobsData] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {     
        document.title = 'Jobs Portal'
    }, [])

    useEffect(() => {
        fetchJobs(page === 1)
    }, [page])

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

    function search() {
        console.log(page)
        if(page === 1) {
             fetchJobs(true)
        } else {
            setPage(1)
        }
    }

    function fetchJobs(reset) {
        if(!loading) {
            if(reset) {
                setJobsData([])
            }
            setLoading(true)
            const url = `${CORS_ANYWHERE}${GITHUB_API_BASE}?search=${encodeURI(query)}&location=${encodeURI(location)}&page=${page}&full_time=${fulltime ? 'on' : false}`
            axios.get(url)
                .then(result => {
                    const currData = reset ? [] : [...jobsData]
                    const newData = currData.concat(result.data)
                    setJobsData(newData)
                })
                .catch(console.err)
                .finally(() => setLoading(false))
        }
    }

    function navigateToDetails(job) {
        dispatch(setJobData(job))
        history.push('/github-jobs/details')
    }

    const NoResults = () => (
        <p className="empty-results">
            No jobs. Try searching for a job.
        </p>
    )

    const SkeletonJobCard = () => (
        loading ? <div className="skeleton-card">
            <div className="skeleton-card-logo"></div>
        </div> : null
    )

    return (
        <div className={`github-jobs theme-${theme}`}>
            
            <header className="site-header">
                <div className="container">
                    <h1>devjobs</h1>

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

                <div className="job-search">
                    <div className="search-input">
                        <input 
                            className="search-input-query" 
                            onChange={(e) => setQuery(e.target.value)} 
                            value={query}
                            placeholder="Filter by title, companies or expertise"
                        />

                        <input 
                            className="search-input-location" 
                            onChange={(e) => setLocation(e.target.value)}
                            value={location} 
                            placeholder="Filter by location"
                        />

                        <div className="full-time-check">
                            <Checkbox
                                label="Full Time Only"
                                onChange={val => setFulltime(val)}
                            />
                            <button 
                                className="btn"
                                onClick={search}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="main-content">

                {jobsData.length === 0 && !loading ? <NoResults /> : null}

                <div className="jobs container">
                    
                    {jobsData ? jobsData.map(job => (
                        <JobCard
                            key={job.id}
                            logo={job.company_logo}
                            created={job.created_at}
                            type={job.type}
                            title={job.title}
                            company={job.company}
                            location={job.location}
                            onClick={() => navigateToDetails(job)}
                        />
                    )) : null}

                    <SkeletonJobCard />
                    <SkeletonJobCard />
                    <SkeletonJobCard />
                    <SkeletonJobCard />
                    <SkeletonJobCard />
                    <SkeletonJobCard />
                </div>

                <div className="show-more">
                    {!loading && jobsData && jobsData.length !== 0 && jobsData.length % 50 === 0 ? <button className="btn" onClick={() => setPage(page+1)}>Show More</button> : null}
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return { jobData: state };
};


export default connect(
    mapStateToProps,
    { setJobData }
  )(Home);