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

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>, questionId: number) => {
        const value = event.target.value;
        setSelectedAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const calculateScore = (questions: IQuestion[], subjectAnswers: { [key: number]: string | null }) => {
        let score = 0;




        questions.forEach(q => {
            console.log(`Question ID: ${q.id}, Correct Answer: ${q.answer}, Selected Answer: ${subjectAnswers[q.id]}`);
            if (subjectAnswers[q.id] === q.answer) {
                score += 1;
                console.log(subjectAnswers)
            }
        });
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
        calculateScore(questions, selectedAnswers);
        handleOpenModal();
    };

    const getColorClass = (idx: number) => {
        if (idx === currentQuestion) {
            return 'bg-blue-200'; // Current question
        } else if (selectedAnswers[idx] != null) {
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
                <div className='text-center p-10 border-2 py-20 bg-green-300 text-customPrimary rounded-lg text-md'>{currentQ?.question}</div>
                <div className=' block justify-center md:grid md:grid-cols-2 md:gap-x-[20rem] lg:grid lg:grid-cols-2 lg:gap-x-[20rem] pt-10 '>
                    {Object.entries(currentQ.option).map(([key, option], idx) => (
                        <div key={idx} className={`border-2 rounded-lg py-4 w-96 cursor-pointer my-4 px-2 border-customPrimary ${selectedAnswers[currentQuestion] === option ? 'bg-customPrimary text-white' : ''}`}
                            onClick={() => setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: option })}>
                            <input
                                type="radio"
                                name={`question-${currentQuestion}`}
                                value={option}
                                checked={selectedAnswers[currentQuestion] === option}
                                onChange={(e) => handleAnswerChange(e, currentQ.id)}
                                className="hidden"
                            /> {option}
                        </div>
                    ))}
                </div>
                <div className='flex justify-between mt-4'>
                    <Button onClick={handlePreviousQuestion} disabled={currentQuestion === 0} className='bg-customPrimary text-white w-40'>
                        Previous
                    </Button>

                    <div className="mt-4">
                        <Button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
                            Submit All
                        </Button>
                    </div>

                    <Button onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1} className='bg-customPrimary text-white w-40'>
                        Next
                    </Button>
                </div>
            </div>
            <div className='mt-4 flex flex-wrap'>
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