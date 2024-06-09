"use client"
import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import CardComponent from '../../components/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IPerformance } from '@/app/data';
import TableRowComponent from '@/app/components/tables/readTable';
import { CiCoinInsert } from "react-icons/ci";
import Barchart from '@/app/components/charts/bar';
import Cookies from 'universal-cookie';
import { useAuthContext } from '@/app/(auth)/context';
import axios from 'axios';
const DashboardView = () => {
    const { currentUser, user } = useAuthContext();
    const cookies = new Cookies();
    let userCookie = cookies.get("user");
    let userTooken = cookies.get("token");
    const [performance, setPerformance] = useState<IPerformance[]>([]);

    const fetchAttendedQuestion = async () => {
        try {
            const res = await axios.get(`https://jamb-past-question.onrender.com/api/performance/${userCookie?._id}`, {
                headers: {
                    'x-auth-token': userTooken
                }
            });
            console.log(res.data);
            setPerformance(res.data?.performance);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {

        if (userCookie && userCookie._id) {
            currentUser(userCookie._id);
            fetchAttendedQuestion();
            console.log(performance)

        } else {
            console.error("User cookie not found or malformed");
        }
    }, []);



    return (
        <div>


            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 pt-5">
                <CardComponent
                    title="Total Coin"
                    amount={user?.profile?.points}
                    change="+20.1% from last month"
                    icon={<CiCoinInsert color="yellow" size={30} />}
                />
                <CardComponent
                    title="Total Transcations"
                    amount={0.00}
                    change="+5.2% from last month"
                />

                <CardComponent
                    title="Converted Coin"
                    amount={0.00}
                    change="+5.2% from last month"
                />

                <CardComponent
                    title="Pending Cion"
                    amount={user?.profile?.points}
                    change="+5.2% from last month"
                />
                {/* Other components */}

            </div>
            <div className='w-full md:w-0 lg:w-0'>
                <Barchart />
            </div>



            <div className='border-2 rounded-lg my-4'>
                <div className='py-6 px-4 w-80'>
                    <h3 className="text-lg font-semibold">Attented Quizs</h3>
                    <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing</p>
                </div>
                <Table className='border-2'>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Subjects</TableHead>
                            <TableHead>Scores</TableHead>
                            <TableHead>Points</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {Array.isArray(performance) ? (
                            performance.slice(0, 10).map((row, index) => (
                                <TableRowComponent
                                    key={index}
                                    subject={row.subject}
                                    score={row.score}
                                    points={row.points}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}>No performance data available</td>
                            </tr>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div >


    )
}

export default DashboardView;
