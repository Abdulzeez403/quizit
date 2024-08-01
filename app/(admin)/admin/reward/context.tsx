"use client"
import axios from "axios";
import { IAirtime, IData, IReward } from '../../../data';
import React, { createContext, useContext, useState } from 'react'
import Cookies from "universal-cookie";
import { notify } from "@/app/components/toast";
interface RewardContextState {
    loading: boolean;
    success: boolean;
    isError: boolean;
    reward: IReward[];
    resetError: () => void;
    createReward: (userId: any, values: any) => void;
    getReward: (userId: any) => void;
    rewardData: (id: string, values: IData) => Promise<void>;
    rewardAirtime: (id: string, values: IAirtime) => Promise<void>;



}
const BuyAirtimeContext = createContext<RewardContextState | undefined>(undefined);

export const useBuyAirtimeContext = () => {
    let context = useContext(BuyAirtimeContext);
    if (context === undefined) {
        throw new Error("app dispatch must be used within app global provider");
    }
    return context;
};

interface IProps {
    children: React.ReactNode;
}

export const BuyAirtimeProvider: React.FC<IProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [reward, setReward] = useState<IReward[]>([]);
    const cookies = new Cookies()

    // const port = process.env.BACKENDURL || "";
    const port = 'https://jamb-past-question.vercel.app/api'

    const resetError = () => {
        setIsError(false);
        setLoading(false)
        setSuccess(false)
    };


    const rewardData = async (id: string, values: IData) => {
        try {
            const { token } = cookies.get("token");
            const response = await axios.post(`${port}/reward/data/${id}`,
                values, {
                headers: {
                    'x-auth-token': token
                }
            }
            );
            notify.success(response.data.msg);
        } catch (error: any) {
            notify.error(error?.response.data.msg);
            console.log(error);
        }
    };

    const rewardAirtime = async (id: string, values: IAirtime) => {
        try {
            const { token } = cookies.get("token");
            const response = await axios.post(`${port}/reward/airtime/${id}`,
                values, {
                headers: {
                    'x-auth-token': token
                }
            });
            notify.success(response.data.msg);
            console.log(values)
        } catch (error: any) {
            notify.error(error?.data?.msg);
            console.log(error);
        }
    };



    const createReward = async (userId: any, values: any) => {

        try {

            const { token } = cookies.get("token");
            const response = await axios.post(`${port}/reward/${userId}`, values, {
                headers: {
                    'x-auth-token': token
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching current user:', error);
            throw error;
        }

    };

    const getReward = async (userId: any) => {
        const { token } = cookies.get("token");

        try {
            const res = await axios.get(`${port}/reward/${userId}`, {
                headers: {
                    'x-auth-token': token
                }
            });
            console.log(res.data);
            setReward(res.data.reward);
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    }


    return (
        <BuyAirtimeContext.Provider
            value={{
                loading, success, isError, resetError,
                createReward, getReward, reward, rewardData, rewardAirtime
            }}>
            {children}
        </BuyAirtimeContext.Provider>
    )
}