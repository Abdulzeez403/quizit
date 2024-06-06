import { Button } from '@/components/ui/button'
import React from 'react'
import Image from "next/image"
import heroImage from "../../../public/Official_JAMB_logo.png"
import Link from 'next/link'
import { useAuthContext } from '@/app/(auth)/context'

export const Herosecton = () => {
    // const { user } = useAuthContext()
    return (
        <div className='herobg'>
            <div className=' pageWidth'>
                <div className='flex justify-between py-[80px] md:py-[135px] lg:py-[135px]'>
                    <div className=''>
                        <h4 className='text-center font-extrabold text-[2rem] text-white md:text-[4rem] md:text-start lg:text-[4rem] 
                        lg:text-start lg:w-[37rem] '>Daily Quiz, Daily Bonus while you sharpen  Your skill</h4>
                        <p className='py-4 text-sm text-white text-center md:text-left lg:text-left'>QuiZit is platform to sharpen your examination skill both on jamb, wace and toher</p>
                        <div className="flex justify-center md:block md:justify-start lg:block lg:justify-star">
                            <Link href="/quiz">
                                <Button className='bg-green-300'>Get Started</Button>
                            </Link>
                        </div>

                    </div>

                    <div className="hidden md:flex lg:flex">
                        <Image src={heroImage} alt="image" width={500} height={500} />
                    </div>
                </div>
            </div>

        </div>

    )
}
