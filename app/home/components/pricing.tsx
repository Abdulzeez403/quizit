import { HeaderText, Text } from '@/app/components/typograpy';
import React from 'react';
import { FaCheck } from "react-icons/fa6";

interface PricingCardProps {
    title: string;
    price: string;
    features: string[];
    bgColor: string;
}

const PricingPlans = () => {
    const plans = [
        {
            title: 'Basic',
            price: '$9.99/mo',
            features: [
                'Feature 1',
                'Feature 2',
                'Feature 3',
            ],
            bgColor: 'bg-blue-500',
        },
        {
            title: 'Standard',
            price: '$19.99/mo',
            features: [
                'Feature 1',
                'Feature 2',
                'Feature 3',
                'Feature 4',
            ],
            bgColor: 'bg-green-500',
        },
        {
            title: 'Premium',
            price: '$29.99/mo',
            features: [
                'Feature 1',
                'Feature 2',
                'Feature 3',
                'Feature 4',
                'Feature 5',
            ],
            bgColor: 'bg-purple-500',
        },
    ];

    const PricingCard = ({ title, price, features, bgColor }: PricingCardProps) => {
        return (
            <div className={`rounded-lg shadow-lg p-6 ${bgColor} text-white w-80`}>
                <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
                <div className="text-4xl font-extrabold mb-4 text-center">{price}</div>
                <div className="mb-6 text-center">
                    {features.map((feature, index) => (
                        <ul className='flex gap-x-4' key={index}>
                            <FaCheck color="green" size={20} />
                            <li className="mb-2">
                                {feature}
                            </li>
                        </ul>

                    ))}
                </div>
                <button className="bg-white text-black font-bold py-2 px-4 rounded">Select Plan</button>
            </div>
        );
    };

    return (
        <div className="pageWidth py-5">
            <div className='pb-10'>
                <HeaderText title="Choose Your Pricing Plan" />
                <div className='w-50'>
                    <Text title="lorem20fsd fsfsdfkksdfks fsdjfsdfkdksfksdfksdklfkds sdfjdfjsdkfsdkfjsdf" />
                </div>
            </div>
            <div className="block justify-center  md:flex md:gap-x-20  lg:flex lg:gap-x-20 ">
                {plans.map((plan, index) => (
                    <div className='py-2'>

                        <PricingCard
                            key={index}
                            title={plan.title}
                            price={plan.price}
                            features={plan.features}
                            bgColor={plan.bgColor}
                        />
                    </div>

                ))}
            </div>
        </div>

    );
};

export default PricingPlans;


