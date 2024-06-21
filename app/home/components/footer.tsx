"use client"
import React from 'react'


export const Footer = () => {
    return (
        <div className='bg-black'>

            <div className='pageWidth pt-5' >
                <div className='block pt-10 justify-center'>

                    <div>
                        <div className='w-[100%] mx-auto md:w-96 lg:w-96'>

                            <h1 className='font-extrabold text-white text-[1.2rem] text-center'>JambFocus</h1>
                            <h4 className='text-customSecondary flex pt-4 text-sm text-center '>Jamb Focus is a dynamic platform where you earn as you learn. Engage with interactive Jamb past questions, expand your knowledge across various subjects..</h4>
                        </div>
                        <div className=''>
                            <h4 className='text-customSecondary text-center py-6 w-42 '>© Copyright 2024, All Rights Reserved <br /> by <span className="text-white">JambFocus</span></h4>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    )
}
