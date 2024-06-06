"use client"
import Link from 'next/link'
import React from 'react'
import { RiTwitterXFill } from "react-icons/ri";
import { CiInstagram } from "react-icons/ci";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";

export const Footer = () => {
    return (
        <div className='bg-black'>

            <div className='pageWidth pt-5' >
                <div className='block pt-10 justify-between md:flex lg:flex'>

                    <div>
                        <div>
                            {/* <Image src={Logo} alt="image" width={120} height={120} /> */}
                            <h1 className='font-extrabold text-white text-[1.2rem] '>QuizIt</h1>
                            <h4 className='text-customSecondary w-52 pt-4 text-sm'>Start Learning with 1-on-1 experience
                                Share your knowledge with others and earn</h4>

                            {/* <div className='flex gap-x-2 items-center'>
                          <Image src={ios} alt="image" width={130} height={130} />
                          <Image src={ios} alt="image" width={130} height={130} />
                      </div> */}

                            <div className='pt-5 flex gap-x-2'>
                                <div className='border border-white rounded-full w-8 h-8 flex items-center justify-center'>
                                    <Link href="/">
                                        <RiTwitterXFill color="white" size={15} />
                                    </Link>
                                </div>
                                <div className='border border-white rounded-full w-8 h-8 flex items-center justify-center'>
                                    <Link href="/">
                                        <CiInstagram color="white" size={15} />
                                    </Link>
                                </div>
                                <div className='border border-white rounded-full w-8 h-8 flex items-center justify-center'>
                                    <Link href="/">
                                        <SlSocialLinkedin color="white" size={15} />
                                    </Link>
                                </div>
                                <div className='border border-white rounded-full w-8 h-8 flex items-center justify-center'>
                                    <Link href="/">
                                        <SlSocialFacebook color="white" size={15} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className='text-secondary py-2 text-lg font-bold'>About Us</h3>
                        <div className=''>
                            <div className='py-2 '>
                                <Link href="/" className='text-slate-400'>Career</Link>

                            </div>
                            <div className='py-2 '>
                                <Link href="/" className='text-slate-400'>Blog</Link>
                            </div>

                            <div className='py-2 '>
                                <Link href="/" className='text-slate-400'>Contact Us</Link>
                            </div>
                            <div className='py-2 '>
                                <Link href="/" className='text-slate-400'>Partnership</Link>
                            </div>
                            <div className='py-2 '>
                                <Link href="/" className='text-slate-400'>Testimonies</Link>
                            </div>


                        </div>


                    </div>

                    <div className='w-32'>
                        <h3 className='text-secondary py-2 text-lg font-bold'>Admin</h3>
                        <div className=''>
                            <div className='py-2 '>
                                <Link href="/" className='text-slate-400'> Payment and Refund Policy</Link>

                            </div>
                            <div className='py-2 '>
                                <Link href="/" className='text-slate-400'>
                                    Privacy Policy
                                </Link>
                            </div>

                            <div className='py-2 '>
                                <Link href="/" className='text-slate-400'> Terms & Condition</Link>
                            </div>
                            <div className='py-2 '>
                                <Link href="/" className='text-slate-400'>Cookies Policy</Link>
                            </div>

                        </div>


                    </div>

                    <div className='w-32'>
                        <h3 className='text-secondary py-2 text-lg font-bold'>Help</h3>
                        <div className=''>
                            <div className='py-2 '>
                                <Link href="/" className='text-slate-400'>Customer Support</Link>

                            </div>
                            <div className='py-2 '>
                                <Link href="/" className='text-slate-400'>
                                    FAQ
                                </Link>
                            </div>

                            <div className='py-2 '>
                                <Link href="/" className='text-slate-400'>
                                    Account Help
                                </Link>
                            </div>
                            <div className='py-2 '>
                                <Link href="/" className='text-slate-400'>Feedback</Link>
                            </div>



                        </div>


                    </div>
                </div>



                <div className=''>
                    <h4 className='text-customSecondary text-center py-6 w-42 '>© Copyright 2024, All Rights Reserved <br /> by Walkmetru</h4>
                </div>
            </div>
        </div>

    )
}
