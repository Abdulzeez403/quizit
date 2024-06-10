"use client"
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { UseSetCookie } from '../components/hooks/cookie';
import { IPerformance, IUser } from '../data';
import { notify } from '../components/toast';
import { jwtDecode } from "jwt-decode";
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';



interface DecodedToken {
    _id: string;
    username: string;
    membership: string;
}

interface IProp {
    loading: boolean;
    userToken: any;
    user: IUser,
    paymentlink: string,
    signIn: (payload: any) => void;
    signUp: (values: any) => void;
    currentUser: (userId: any) => void;
    updateUser: (userId: any, values: IPerformance) => void;
    createPayment: (userId: any, values: any) => void;
    getPayment: (userId: any) => void;


    signOut: () => void;
}
const AuthContext = createContext<IProp>({
    loading: false,
    userToken: null,
    user: null || {},
    paymentlink: "",
    signIn: (payload) => {
        return null
    },
    signUp: (values) => { },
    currentUser: (userId) => { },
    updateUser: (userId, values) => { },
    signOut: () => { },
    createPayment: (userId, values) => { },
    getPayment: (userId) => { }
});

export const useAuthContext = () => {
    let context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("app dispatch must be used within app global provider");
    }
    return context;
};

interface IProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<IProps> = ({ children }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState({} as any);
    const [userToken, setUserToken] = useState<any>(null)
    const [paymentlink, setPaymentlink] = useState<string>("")
    const cookies = new Cookies()
    const router = useRouter();




    const port = "https://jamb-past-question.onrender.com/api";

    const signIn = async (payload: any) => {
        setLoading(true)
        try {
            const response = await axios.post(`${port}/user/login`, payload);
            let decoded: DecodedToken = jwtDecode<DecodedToken>(response.data.token);
            UseSetCookie("user", decoded)
            UseSetCookie("token", response.data)
            setUser(response.data);
            setLoading(false)
            window.location.reload();
            notify.success(response.data.msg);


        } catch (error) {
            setLoading(false)
            notify.error("Error signing up:");

            throw error;
        }
    };



    const signUp = async (userData: any) => {
        setLoading(true);
        try {
            const response = await axios.post(`${port}/user`, userData);
            notify.success('Sign up successful');
            setLoading(false);
        } catch (error) {
            setLoading(false)
            notify.error('Error signing up');
            console.error('Error signing up:', error);
            throw error;
        }
    };

    const currentUser = async (userId: any) => {
        try {

            const { token } = cookies.get("token");
            const response = await axios.get(`${port}/user/${userId}`, {
                headers: {
                    'x-auth-token': token
                }
            });
            setUser(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching current user:', error);
            throw error;
        }
    };


    const updateUser = async (userId: any, values: IPerformance) => {
        setLoading(true);

        try {

            const { token } = cookies.get("token");
            const response = await axios.post(`${port}/performance/${userId}`, values, {
                headers: {
                    'x-auth-token': token
                }
            });
            setUser(response.data);
            console.log(response.data)
            setLoading(false);
            return response.data;
        } catch (error) {
            console.error('Error fetching current user:', error);
            throw error;
        }
    };

    const createPayment = async (userId: any, values: any) => {
        try {

            const { token } = cookies.get("token");
            const response = await axios.post(`${port}/payment/initialize-transaction/${userId}`, values, {
                headers: {
                    'x-auth-token': token
                }
            });
            console.log(response.data)
            setPaymentlink(response.data)
            router.push(response.data)
            setLoading(false);
            return response.data;
        } catch (error) {
            console.error('Error payment:', error);
            throw error;
        }

    }

    const getPayment = async (userId: any) => {
        try {

            const { token } = cookies.get("token");
            const response = await axios.get(`${port}/payment/payment-response/${userId}`, {
                headers: {
                    'x-auth-token': token
                }
            });
            setPaymentlink(response.data)
            router.push(paymentlink)
            setLoading(false);
            return response.data;
        } catch (error) {
            console.error('Error payment:', error);
            throw error;
        }
    }

    const signOut = async () => {
        cookies.remove('user');
        cookies.remove('token');
        router.push('/')
        window.location.reload();

    };


    return (
        <AuthContext.Provider
            value={{ loading, user, signIn, signUp, currentUser, signOut, userToken, updateUser, createPayment, getPayment, paymentlink }}>
            {children}

        </AuthContext.Provider>
    )
}