import { useAuthContext } from '@/app/(auth)/context';
import LoadingSpinner from '@/app/components/loader';
import RingSpinner from '@/app/components/loader/circlering';
import { ResponsiveDrawerDialog } from '@/app/components/modal/responsivedrawer';
import { IPerformance, IQuestion } from '@/app/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

interface IQuestionProps {
    questions: IQuestion[];
    subject: string
}

const QuestionTemplate = ({ questions, subject }: IQuestionProps) => {
    const { updateUser, loading } = useAuthContext()
    const cookies = new Cookies();
    let userCookie = cookies.get("user");


    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string | null }>({});
    const [theScore, setTheScore] = useState(0);
    const [open, setOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20 * 60);

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleOpenModal = () => {
        setOpen(true);
    };

    useEffect(() => {
        if (loading) {
            handleOpenModal();
        }
    }, [loading]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleReload = () => {
        window.location.reload();
    };

    const handleUpdateUser = async (score: number) => {
        const userId = userCookie?._id;
        const newPerformance: IPerformance = {
            subject,
            score,
            points: score
        };

        try {
            const updatedUser = await updateUser(userId, newPerformance);
            console.log('User updated successfully:', updatedUser);
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const handleAnswerChange = (questionId: number, optionKey: string) => {
        setSelectedAnswers(prev => ({ ...prev, [questionId]: optionKey }));
    };

    const calculateScore = () => {
        let score = 0;

        questions.forEach(q => {
            console.log(`Question ID: ${q.id}, Correct Answer: ${q.answer}, Selected Answer: ${selectedAnswers[q.id]}`);
            if (selectedAnswers[q.id] === q.answer) {
                score += 1;
            }
        });

        console.log(`Calculated Score: ${score}`);
        setTheScore(score);
        return score;
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };
    const handleSubmit = async () => {
        const score = calculateScore();
        await handleUpdateUser(score);
        handleOpenModal();
    };

    const getColorClass = (idx: number) => {
        if (idx === currentQuestion) {
            return 'bg-blue-200'; // Current question
        } else if (selectedAnswers[questions[idx].id] != null) {
            return 'bg-green-200'; // Answered question
        } else {
            return 'bg-gray-200'; // Unanswered question
        }
    };

    if (questions.length === 0) {
        return <div>No questions available.</div>;
    }

    const currentQ = questions[currentQuestion];

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className=''>
            <div>
                <div className='text-center border-2 bg-customPrimary text-customSecondary rounded-lg text-lg'>
                    <div className='flex justify-between items-center py-4 px-5'>
                        <h4 className="text-white">{subject}</h4>
                        <h4 className='bg-white text-customPrimary p-2 rounded-md'>{formatTime(timeLeft)}</h4>
                    </div>
                    <h4 className="py-6 text-white"
                        dangerouslySetInnerHTML={{ __html: currentQ?.section }}>
                    </h4>

                    <h4 className="pb-2 text-white" dangerouslySetInnerHTML={{ __html: currentQ?.question }}></h4>
                </div>
                <div className='block justify-center md:grid md:grid-cols-2 md:gap-x-[20rem] lg:grid lg:grid-cols-2 lg:gap-x-[20rem] pt-5'>
                    {Object.entries(currentQ.option).map(([key, option], idx) => (
                        <div key={idx} className={`border-2 rounded-lg py-4 cursor-pointer my-4 px-2 border-customPrimary ${selectedAnswers[currentQ.id] === key ? 'bg-customPrimary text-white' : ''}`}
                            onClick={() => handleAnswerChange(currentQ.id, key)}>
                            {option}
                        </div>
                    ))}
                </div>
                <div className='flex justify-between mt-4 items-center'>
                    <Button onClick={handlePreviousQuestion} disabled={currentQuestion === 0} className='bg-customPrimary text-white w-40 hover:bg-customSecondary'>
                        Previous
                    </Button>

                    <Button onClick={handleSubmit} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-customSecondary">
                        Submit
                    </Button>

                    <Button onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1} className='bg-customPrimary text-white w-40 hover:bg-customSecondary'>
                        Next
                    </Button>
                </div>
            </div>
            <div className='grid grid-cols-6 w-[100%] mt-4 md:flex md:flex-wrap lg:flex lg:flex-wrap'>
                {questions?.map((q, idx) => (
                    <div key={idx} className={`border-2 p-2 w-20 text-center ${getColorClass(idx)}`}>
                        {idx + 1}
                    </div>
                ))}
            </div>

            <div>
                {
                    loading ? (
                        <RingSpinner />
                    ) : (
                        <ResponsiveDrawerDialog
                            title="Quiz Result"
                            description="Your quiz score"
                            isOpen={open}
                        // onClose={handleCloseModal}
                        >
                            <div>

                                <div>

                                    <h4 className="text-center py-4">Congratulations! Your score is {theScore} out of {questions.length}</h4>

                                    <div className='flex justify-center'>

                                        <div>
                                            <Link href="/admin/reward" className="pr-2">
                                                <Button className="bg-customSecondary text-white px-4 py-2 rounded hover:bg-slate-300">
                                                    Reward
                                                </Button>
                                            </Link>

                                            <Button onClick={handleReload} className="bg-customSecondary text-white px-4 py-2 rounded hover:bg-slate-300">
                                                Try Again
                                            </Button>

                                        </div>
                                    </div>


                                </div>



                            </div >

                        </ResponsiveDrawerDialog >
                    )
                }
            </div>

        </div>
    );
};

export default QuestionTemplate;
