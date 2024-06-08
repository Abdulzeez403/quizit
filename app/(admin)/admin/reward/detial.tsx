"use client"
import TableRowComponent from '@/app/components/tables/readTable'
import { Table, TableBody } from '@/components/ui/table'
import React, { useEffect, useState } from 'react'
import CardComponent from '../../../components/card';
import { CiCoinInsert } from 'react-icons/ci';
import { Button } from '@/components/ui/button';
import { ResponsiveDrawerDialog } from '@/app/components/modal/responsivedrawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AirtimeForm } from './forms/airtime'
import { useAuthContext } from '@/app/(auth)/context';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { IReward } from '@/app/data';
import RewardTable from './rewardTable';


export const RewardDetial = () => {
    const { currentUser, user } = useAuthContext();
    const cookies = new Cookies();
    let userCookie = cookies.get("user");
    let userTooken = cookies.get("token");
    const [reward, setReward] = useState<IReward[]>([]);

    const fetchReward = async () => {
        try {
            const res = await axios.get(`https://jamb-past-question.onrender.com/api/reward/${userCookie?._id}`, {
                headers: {
                    'x-auth-token': userTooken
                }
            });
            console.log(res.data);
            setReward(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {

        if (userCookie && userCookie._id) {
            currentUser(userCookie._id);
            fetchReward();

        } else {
            console.error("User cookie not found or malformed");
        }
    }, []);



    const [open, setOpen] = useState(false);

    const handleCloseModal = () => {
        setOpen(false)
    }

    const handleOpenModal = () => {
        setOpen(true)
    }

    const isButtonDisabled = user?.profile?.points < 100 && user?.profile?.rewardCount >= 1 && user?.profile?.membership === "free";



    return (
        <div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 pt-5">
                <CardComponent
                    title="Total Reward"
                    amount={user?.profile?.points}
                    change="+20.1% from last month"
                    icon={<CiCoinInsert color="yellow" size={30} />}
                />
                <CardComponent
                    title="Current Reward"
                    amount={0.00}
                    change="+5.2% from last month"
                />

                <CardComponent
                    title="Withdraw Reward"
                    amount={0.00}
                    change="+5.2% from last month"
                />

                <Button
                    onClick={handleOpenModal}
                    className={`w-full mt-4 ${!isButtonDisabled ? "bg-black text-white" : "disabled:bg-slate-300"}`}
                    disabled={isButtonDisabled}
                >
                    Swap Coin
                </Button>

            </div>
            <div className='border-2 rounded-lg my-4'>
                <div className='py-6 px-4 w-80'>
                    <h3 className="text-lg font-semibold">Transaction</h3>
                    <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum eius saepe aut</p>
                </div>
                <Table className='border-2'>
                    <TableBody >
                        {Array.isArray(reward) && reward.slice(0, 10)?.map((row, index) => (
                            <RewardTable
                                key={index}
                                type={row.type}
                                amount={row.amount}
                                points={row.points}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>

            <ResponsiveDrawerDialog
                title="Swap Your Coin "
                description="Let's the journey begins!"
                isOpen={open}
                onClose={handleCloseModal}
            >

                <Tabs defaultValue="airtime" className=" ">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="airtime" className='active:bg-customSecondary'>Airtime</TabsTrigger>
                        <TabsTrigger className='active:bg-customSecondary' value="data">Data</TabsTrigger>
                    </TabsList>

                    <TabsContent value="airtime">
                        <AirtimeForm />
                    </TabsContent>
                    <TabsContent value="data">
                        <h4>data</h4>

                    </TabsContent>

                </Tabs>

            </ResponsiveDrawerDialog>
        </div>

    )
}
