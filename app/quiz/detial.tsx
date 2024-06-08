"use client"
import React, { useEffect, useState } from 'react';
import QuestionTemplate from './components/questionTemplate';
import Image from "next/image"
import User from "../../public/user.png"
import { ResponsiveDrawerDialog } from '../components/modal/responsivedrawer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LoadingSpinner from '../components/loader';
import { Button } from '@/components/ui/button';
import Cookies from 'universal-cookie';
import { useAuthContext } from '../(auth)/context';





export const QuizDetial = () => {

    const { currentUser } = useAuthContext();
    const cookies = new Cookies();
    let userCookie = cookies.get("user");


    useEffect(() => {

        if (userCookie && userCookie._id) {
            currentUser(userCookie._id);
        } else {
            console.error("User cookie not found or malformed");
        }
    }, []);





    const subjects = ['Mathematics', 'English', 'Physics', 'Chemistry', 'Commerce', 'Biology', 'Accounting', 'English Literature'];
    const years = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001];
    const [selectedSubject, setSelectedSubject] = useState("English");
    const [selectedYear, setSelectedYear] = useState("2019");

    const [questions, setQuestions] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleOpenModal = () => {
        setOpen(true);
    };

    const fetchQuestion = async () => {
        setLoading(true);
        try {
            // Replace with your API endpoint
            const response = await fetch(`https://questions.aloc.com.ng/api/v2/m?subject=${selectedSubject}&year=${selectedYear}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    AccessToken: 'QB-b2999a6edef68145066a',
                },
                method: 'GET',
            });
            const result = await response.json();

            if (result.status === 200 && Array.isArray(result.data)) {
                setQuestions(result.data);
            } else {
                console.error('Unexpected data format:', result);
                setQuestions([]); // handle empty or unexpected data
            }
        } catch (error) {
            console.error('Failed to fetch questions:', error);
            setQuestions([]); // handle fetch error
        }
        setLoading(false);
    };


    // const fetchQuestion = () => {
    //     fetch(`https://questions.aloc.com.ng/api/v2/m?subject=${selectedSubject}&year=${selectedYear}`, {
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             AccessToken: 'QB-b2999a6edef68145066a',
    //         },
    //         method: 'GET',
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('data', data);
    //             setQuestions(data)
    //         })
    //         .catch(error => {
    //             console.log('error', error);
    //         });
    // }

    useEffect(() => {
        handleOpenModal()
    }, [])

    const handleStartQuiz = async () => {
        handleCloseModal();
        fetchQuestion();

    };



    return (
        <div>


            <div className='bg-customPrimary'>
                <div className=' py-2 pageWidth flex justify-between items-center'>
                    <h3 className='text-white'>QuizIt</h3>
                    <div className='flex gap-x-5 items-center text-white'>
                        <h4>{userCookie?.username}</h4>
                        {/* <Image src={User} alt="image" className='rounded-full' width={40} height={40} /> */}
                    </div>

                </div>
            </div>

            <div className='px-4 md:pageWidth lg:pageWidth'>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <QuestionTemplate questions={questions} subject={selectedSubject} />
                )}



                <ResponsiveDrawerDialog
                    title="Start Quiz"
                    description="Let's the journey begins!"
                    isOpen={open}
                    onClose={handleCloseModal}
                >

                    <h4>Select Year!</h4>
                    <Select onValueChange={(val) => {
                        setSelectedYear(val);
                        console.log(val)
                    }}>
                        <SelectTrigger className="w-60">
                            <SelectValue placeholder="2018" />
                        </SelectTrigger>
                        <SelectContent>

                            {years.map((year) => (
                                <SelectItem key={year} value={year}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <h4>Select Subject!</h4>
                    <Select onValueChange={(val) => setSelectedSubject(val)}>
                        <SelectTrigger className="w-60">
                            <SelectValue placeholder="English" />
                        </SelectTrigger>

                        <SelectContent>

                            {subjects.map((subject) => (
                                <SelectItem key={subject} value={subject}>
                                    {subject}
                                </SelectItem>
                            ))}
                        </SelectContent>

                    </Select>

                    <Button onClick={handleStartQuiz} className='bg-customPrimary text-white w-40'>
                        Start Quiz
                    </Button>

                </ResponsiveDrawerDialog>





            </div>

        </div>

    );
};

