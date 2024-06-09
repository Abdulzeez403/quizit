import React, { useState } from 'react'
import { Herosecton } from './components/herosecton';
import { Howitwork } from './components/howitwork';
import { Footer } from './components/footer';
import SubjectSection from './components/subject';
import PricingSection from './components/pricing';
import PricingPlans from './components/pricing';

interface IProps {
    handleOpenModal: () => void;
}
const HomePage = ({ handleOpenModal }: IProps) => {
    return (
        <div>
            <Herosecton handleOpenModal={handleOpenModal} />
            <Howitwork />
            <SubjectSection />
            <PricingPlans handleOpenModal={handleOpenModal} />
            <Footer />
        </div>
    )
}

export default HomePage;
