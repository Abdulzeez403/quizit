import React, { useState } from 'react'
import { Herosecton } from './components/herosecton';
import { Howitwork } from './components/howitwork';
import { Footer } from './components/footer';
import SubjectSection from './components/subject';
import PricingSection from './components/pricing';
import PricingPlans from './components/pricing';


const HomePage = () => {
    return (
        <div>
            <Herosecton />
            <Howitwork />
            <SubjectSection />
            <PricingPlans />
            <Footer />
        </div>
    )
}

export default HomePage;
