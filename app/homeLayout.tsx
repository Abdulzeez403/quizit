"use client"
import { useEffect, useState } from 'react';
import { ResponsiveDrawerDialog } from './components/modal/responsivedrawer'
import { SignInForm } from './(auth)/signin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignUpForm } from './(auth)/signup';
import Cookies from 'universal-cookie';
import Link from 'next/link';
import { useAuthContext } from './(auth)/context';
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface IProps {
    handleCloseModal: () => void;
    handleOpenModal: () => void;
    open: boolean
}

const HomeLayout = ({ handleOpenModal, handleCloseModal, open }: IProps) => {

    const { currentUser, user, signOut, loading } = useAuthContext();

    const cookies = new Cookies();
    let userCookie = cookies.get("user");


    useEffect(() => {

        if (userCookie && userCookie._id) {
            currentUser(userCookie._id);
        } else {
            console.error("User cookie not found or malformed");
        }
    }, []);


    // useEffect(() => {
    //     if (loading) {
    //         handleOpenModal();
    //     }
    // }, [loading]);







    return (
        <div className='herobg'>

            <div className='pageWidth'>
                <div className="flex justify-between items-center py-6">
                    <h3 className='text-white font-bold text-[1.5rem]'>JambFocus
                    </h3>

                    <div className="hidden md:flex lg:flex">
                        <div className=" hidden gap-x-4 items-center text-white lg:flex">
                            <Link href="/career" className=' text-[20px]'>Home</Link>
                            <Link href="/career" className='text-[20px]'>Blog</Link>
                            <Link href="/career" className='text-[20px]'>FAQ</Link>
                            {userCookie?._id && (<Link href="/admin" className='text-[20px]'>Dashboard</Link>)}
                        </div>
                    </div>
                    <div>
                        {
                            userCookie?._id ? (

                                <div className='flex gap-x-4'>
                                    <Button className='bg-foreground border-none hidden md:flex lg:flex bg-customSecondary text-white'>
                                        <Link href="/admin">{user?.username}</Link>
                                    </Button>

                                    <Button className='bg-foreground border-none hidden md:flex lg:flex bg-customSecondary text-white' onClick={() => { signOut() }}>
                                        LogOut
                                    </Button>
                                </div>


                            ) : (
                                <div className="pl-4 flex ">
                                    <Button onClick={handleOpenModal} className="text-customPrimary bg-customSecondary hover:bg-slate-300">Login/Register</Button>
                                </div>

                            )
                        }
                    </div>

                    <div className="flex md:hidden lg:hidden">
                        <Sheet>
                            <SheetTrigger>
                                <HiOutlineMenuAlt2 color="white" size={30} />
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>QiuzIt</SheetTitle>
                                    <div className="block items-center">
                                        <div>
                                            <Link href="/" className=' text-[20px]'>Home</Link>
                                        </div>
                                        <div>

                                            <Link href="/" className='text-[20px]'>Blog</Link>
                                        </div>
                                        <div>

                                            <Link href="/" className='text-[20px]'>FAQ</Link>
                                        </div>
                                        <div>

                                            {userCookie?._id && (<Link href="/admin" className='text-[20px]'>Dashboard</Link>)}
                                        </div>




                                        <div className='
                                        border-none p-2 rounded-md bg-customSecondary text-customPrimary' onClick={() => {
                                                signOut(),
                                                    window.location.reload();
                                            }}>
                                            LogOut
                                        </div>


                                    </div>


                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>


                </div>
            </div >

            <ResponsiveDrawerDialog
                title="Login/Register"
                description="Let's the journey begins!"
                isOpen={open}
                onClose={handleCloseModal}
            >
                <Tabs defaultValue="signin" className=" pr-2">
                    <TabsList className=" w-90 grid grid-cols-2">
                        <TabsTrigger value="signin" className='focus:bg-customSecondary'>SignIn</TabsTrigger>
                        <TabsTrigger value="signup" className='active:bg-customSecondary'>SignUp</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin">
                        <SignInForm />
                    </TabsContent>

                    <TabsContent value="signup" >
                        <SignUpForm />

                    </TabsContent>

                </Tabs>


            </ResponsiveDrawerDialog>



        </div>

    );
};
export default HomeLayout;
