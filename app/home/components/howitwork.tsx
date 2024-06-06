import { HeaderText, Text } from '@/app/components/typograpy';
import React from 'react';
import Image from 'next/image';
import { howitworkData } from '@/app/data';


export const Howitwork = () => {
    return (
        <div className='pageWidth py-10 '>
            <div className='pb-10'>
                <HeaderText title="Here is How it Works" />
                <div className='w-50'>
                    <Text title="lorem30 dflkdkf dfkdskfksdfdkf dfd f dfdfkdfkdfk lorem30 lorem30 kke  euuere ererern kefjefk hjjsjfjf fjdjuueu jjfjfhsfh " />
                </div>

            </div>

            <div className='block justify-center  
            md:flex md:gap-x-20 md:pb-0
            lg:flex  lg:gap-x-20  lg:pb-0'>
                {
                    howitworkData?.map((d, index) => (
                        <div className="w-90 border-2 rounded-lg p-2 py-10 border-green-400 opacity-2 my-4 md:my-0 lg:my-0" key={index}>
                            <div className='flex justify-center'>

                                <Image src={d.img} alt={d.img} width={100} height={100} />
                            </div>

                            {/* <HeaderText title={d.title} className='text-sm md:text-lg lg:text-lg' /> */}

                            <div>
                                <h4 className='text-center py-2 font-bold text-md'>{d.title}</h4>
                            </div>
                            <Text title={d.desc} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
