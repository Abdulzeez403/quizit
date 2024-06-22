import { useAuthContext } from '@/app/(auth)/context';
import { HeaderText, Text } from '@/app/components/typograpy';
import { Route } from 'lucide-react';
import React, { useEffect } from 'react';
import { FaCheck } from "react-icons/fa6";
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface PricingCardProps {
    title: string;
    price: string;
    features: string[];
    bgColor: string;
}

interface IProps {
    handleOpenModal: () => void;
}

const PricingPlans = ({ handleOpenModal }: IProps) => {


    const router = useRouter()

    const { currentUser, user, createPayment, paymentlink } = useAuthContext();
    const cookies = new Cookies();
    let userCookie = cookies.get("user");
    let theLink = paymentlink

    useEffect(() => {

        if (userCookie && userCookie._id) {
            currentUser(userCookie._id);

        } else {
            console.error("User cookie not found or malformed");
        }
    }, []);

    const handlepayment = async () => {
        try {
            const userId = userCookie._id;
            const payload = {
                customerName: user.name,
                customerEmail: user.email
            };
            await createPayment(userId, payload);
        } catch (error) {
            console.error("Error processing payment:", error);
        }
    };


    const plans = [
        {
            id: 1,
            title: 'Basic',
            price: 'Free',
            features: [
                '40 Questions',
                'Coin to Airtime',
                'All Subject Access ',
                'Convert Once',

            ],
            bgColor: 'bg-blue-500',
        },
        {
            id: 2,
            title: 'Standard',
            price: '1.000/mo',
            features: [
                '100 Questions',
                'Mutilple Convertions',
                'All Subjects Account',
                'Coin to Data and Airtime',
                'Advanced Features',
            ],
            bgColor: 'bg-green-500',
        },
        {
            id: 3,
            title: 'Premium',
            price: '*****',
            features: [
                '100 Questions',
                'Mutilple Convertion',
                'All Subjects Account',
                'Advanced Features',
                'Coin to Data and More',
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
                {userCookie?._id ? (
                    <Button className={`bg-white text-black font-bold py-2 px-4 rounded ${title === "Basic" ? "hidden" : "flex"}`} 
                    disabled={title === "Premium" ? true: false}
                    onClick={() => handlepayment()}>

                        {title === "Premium" ? (<h4>Coming Soon</h4>) : (
                            < h4 >Select Plan</h4>)}</Button>
                ) : (
                    <Button className={`bg-white text-black font-bold py-2 px-4 rounded ${title === "Basic" ? "hidden" : "flex"}`} 
                    disabled={title === "Premium" ? true: false}
                    onClick={() => handleOpenModal()}>
                        {title === "Premium" ? (<h4>Coming Soon</h4>) : (
                            < h4 >Select Plan</h4>)}</Button>

                )

                }

            </div>
        );
    };

    return (
        <div className="pageWidth py-5">
            <div className='pb-10'>
                <HeaderText title="Choose Your Pricing Plan" />
                <div className='w-50'>
                    <Text title="Find the Perfect Fit By Selecting Best Plan" />
                </div>
            </div>
            <div className="block justify-center  md:flex md:gap-x-20  lg:flex lg:gap-x-20 ">
                {plans.map((plan, index) => (
                    <div className='py-2'
                        key={plan?.id}
                    >

                        <PricingCard
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


