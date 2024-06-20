import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import Image from "next/image"
import heroImage from "../../../public/JAMB-computer-exam.jpg"
import Link from 'next/link'
import { useAuthContext } from '@/app/(auth)/context'
import Cookies from 'universal-cookie'
interface IProps {
    handleOpenModal: () => void;
}


export const Herosecton = ({ handleOpenModal }: IProps) => {
    const { currentUser, user, signOut } = useAuthContext();
    const cookies = new Cookies();
    let userCookie = cookies.get("user");


    useEffect(() => {

        if (userCookie && userCookie._id) {
            currentUser(userCookie._id);
        } else {
            console.error("User cookie not found or malformed");
        }
    }, []);

    return (
        <div className='herobg'>
            <div className=' pageWidth'>
                <div className='flex justify-between py-[80px] md:py-[135px] lg:py-[135px]'>
                    <div className=''>
                        <h4 className='text-center font-extrabold text-[2rem] text-white md:text-[4rem] md:text-start lg:text-[4rem] 
                        lg:text-start lg:w-[37rem] '>Daily Quiz, Daily Bonus while you sharpen  Your skill</h4>
                        <p className='py-4 text-sm text-white text-center md:text-left lg:text-left'>JambFocus is platform to sharpen your examination skill both on jamb, wace and toher</p>
                        <div className="flex justify-center md:block md:justify-start lg:block lg:justify-star">

                            {
                                userCookie?._id ? (<Link href="/admin">
                                    <Button className='bg-white text-customPrimary hover:bg-slate-300'>Start Quiz</Button>
                                </Link>) : (
                                    <Button className='bg-white text-customPrimary hover:bg-slate-300' onClick={handleOpenModal}>Start Quiz</Button>
                                )
                            }

                        </div>

                    </div>

                    <div className="hidden md:flex lg:flex">
                        <Image src={heroImage} alt="image" width={500} height={500} className="rounded-lg" />
                    </div>
                </div>
            </div>

        </div>

    )
}
