import { HeaderText, Text } from '@/app/components/typograpy'
import React from 'react'
import AllSubjectImage from "../../../public/allsubject.png"
import { MdOutlineSchool } from "react-icons/md";

import Image from 'next/image'
import { FaCalculator, FaMicroscope, FaBook, FaAtom, FaFlask } from 'react-icons/fa6';
const subjects = [
    { name: 'English Language', icon: <MdOutlineSchool color="white" size={25} /> },
    { name: 'Mathematics', icon: <FaCalculator color="white" size={25} /> },
    { name: 'Commerce', icon: <FaBook color="white" size={25} /> },
    { name: 'Accounting', icon: <FaCalculator color="white" size={25} /> },
    { name: 'Biology', icon: <FaMicroscope color="white" size={25} /> },
    { name: 'Physics', icon: <FaAtom color="white" size={25} /> },
    { name: 'Chemistry', icon: <FaFlask color="white" size={25} /> },
    { name: 'English Literature', icon: <FaBook color="white" size={25} /> },
    { name: 'More...', icon: <FaBook color="white" size={25} /> }
];

function SubjectSection() {
    return (
        <div className="herobg">

            <div className="pageWidth py-5">
                <div className='pb-10'>
                    <HeaderText title="Supported Subjects" className='text-white' />
                    <div className='w-50'>
                        <Text title="lorem20fsd fsfsdfkksdfks fsdjfsdfkdksfksdfksdklfkds sdfjdfjsdkfsdkfjsdf" className="text-white" />
                    </div>
                </div>

                <div className='flex justify-center gap-x-60'>

                    <div>
                        <h4 className='text-white py-2 text-center'>We supported 17 subjects</h4>
                        <div className="border-2 shadow-md w-80 p-5">
                            <div>
                                {subjects.map((subject, index) => (
                                    <div className='flex gap-x-4 items-center' key={index}>
                                        <div className='w-10 h-10 bg-customSecondary p-2 rounded-full'>
                                            {subject.icon}
                                        </div>
                                        <h4 className='py-4 text-white'>{subject.name}</h4>
                                    </div>
                                ))}
                            </div>


                        </div>
                    </div>

                    <div className='hidden md:flex lg:flex'>
                        <Image src={AllSubjectImage} alt="image" width={500} height={500} />

                    </div>
                </div>

            </div>

        </div>

    )
}

export default SubjectSection