import { ResponsiveDrawerDialog } from '@/app/components/modal/responsivedrawer';
import { IQuestion } from '@/app/data';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

interface IQuestionProps {
    questions: IQuestion[];
}

const QuestionTemplate = ({ questions }: IQuestionProps) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string | null }>({});
    const [theScore, setTheScore] = useState(0);
    const [open, setOpen] = useState(false);

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleOpenModal = () => {
        setOpen(true);
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

    const handleSubmit = () => {
        calculateScore();
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

    return (
        <div className=''>
            <div>
                <div className='text-center border-2 bg-green-300 text-customPrimary rounded-lg text-lg'>
                    <div className='flex justify-between items-center py-4 px-5'>
                        <h4>English</h4>
                        <h4 className='text-white bg-black p-2 rounded-md'>20:00 min</h4>
                    </div>

                    <h4 className="py-10">{currentQ?.question}</h4>
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

                    <Button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Submit
                    </Button>

                    <Button onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1} className='bg-customPrimary text-white w-40 hover:bg-customSecondary'>
                        Next
                    </Button>
                </div>
            </div>
            <div className='hidden mt-4 md:flex md:flex-wrap lg:flex lg:flex-wrap'>
                {questions?.map((q, idx) => (
                    <div key={idx} className={`border-2 p-2 w-20 text-center ${getColorClass(idx)}`}>
                        {q.id}
                    </div>
                ))}
            </div>

            <ResponsiveDrawerDialog
                title="Quiz Result"
                description="Your quiz score"
                isOpen={open}
                onClose={handleCloseModal}
            >
                <h4>Congratulations! Your score is {theScore} out of {questions.length}</h4>
            </ResponsiveDrawerDialog>
        </div>
    );
};

export default QuestionTemplate;
