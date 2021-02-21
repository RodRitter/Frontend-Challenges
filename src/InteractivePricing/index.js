import React, { useState, useEffect } from 'react'
import './styles/main.scss';
import RangeSlider from './components/RangeSlider';
import Switch from './components/Switch';

const PRICES = [
    [
        {key: 'views', value: '10K'},
        {key: 'price', value: 8}
    ],
    [
        {key: 'views', value: '50K'},
        {key: 'price', value: 12}
    ],
    [
        {key: 'views', value: '100K'},
        {key: 'price', value: 16}
    ],
    [
        {key: 'views', value: '500K'},
        {key: 'price', value: 24}
    ],
    [
        {key: 'views', value: '1M'},
        {key: 'price', value: 36}
    ],
]

export default function InteractivePricing() {

    const [yearlyBilling, setYearlyBilling] = useState(false);
    const [pricing, setPricing] = useState(PRICES[0]);

    function onBillingChange(toggleState) {
        setYearlyBilling(toggleState)
    }

    function parsePricing(isAnnual) {
        let price = pricing[1].value

        if(isAnnual) {
            price = price * 0.75;
        }
        
        return `$${price.toFixed(2)}`
    }

    return (
        <div className="interactive-pricing">
            
            <div className="content">
                <div className="cta">
                    <h1>Simple, traffic-based pricing</h1>
                    <h2>Sign up for our 30-day trial. No credit card required.</h2>
                </div>

                <div className="pricing">
                    <div className="page-views">{pricing[0].value} Pageviews</div>
                    <div className="per-month">
                        <span>{parsePricing(yearlyBilling)}</span>
                        <span>/ month</span>
                    </div>

                    <div className="slider">
                        <RangeSlider segments={PRICES} initialValue={2} onChange={val => setPricing(val.data)} />
                    </div>

                    <div className="billing-type">
                        <div className="monthly-label">Monthly Billing</div>

                        <div className="billing-switch">
                            <Switch 
                                width={50}
                                height={25}
                                initialValue={yearlyBilling}
                                onChange={onBillingChange} />
                        </div>

                        <div className="yearly-label">Yearly Billing 
                            <span className="discount">
                                <span>25% discount</span>
                                <span className="truncated">-25%</span>
                            </span>
                        </div>
                    </div>

                    <div className="call-to-action">
                        <div>
                            <ul className="feature-list">
                                <li><span>Unlimited websites</span></li>
                                <li><span>100% data ownership</span></li>
                                <li><span>Email reports</span></li>
                            </ul>
                        </div>

                        <div>
                            <button className="btn">Start my trial</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
