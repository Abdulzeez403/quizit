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

    const { currentUser, user, signOut } = useAuthContext();
    const cookies = new Cookies();
    let userCookie = cookies.get("user");


    useEffect(() => {

        if (userCookie && userCookie._id) {
            currentUser(userCookie._id);
        } else {
            console.error("User cookie not found or malformed");
        }
    }, [currentUser]);




    return (
        <div className='herobg'>

            <div className='pageWidth'>
                <div className="flex justify-between items-center py-6">
                    <h3 className='text-white font-bold text-[1.5rem]'>QuizIt
                    </h3>

                    <div className="hidden md:flex lg:flex">
                        <div className=" hidden gap-x-4 items-center text-white lg:flex">
                            <Link href="/career" className=' text-[20px]'>Home</Link>
                            <Link href="/career" className='text-[20px]'>Blog</Link>
                            <Link href="/career" className='text-[20px]'>FAQ</Link>
                        </div>
                    </div>
                    <div>
                        {
                            userCookie?._id ? (

                                <div className='flex'>
                                    <Button className='bg-foreground border-none hidden md:flex lg:flex bg-customSecondary text-white'>
                                        <Link href="/admin">{user?.username}</Link>
                                    </Button>

                                    <Button className='bg-foreground border-none hidden md:flex lg:flex bg-customSecondary text-white' onClick={() => { signOut() }}>
                                        LogOut
                                    </Button>
                                </div>


                            ) : (
                                <div className="pl-4 flex space-x-4 ">
                                    <Button onClick={handleOpenModal} className="text-black bg-customSecondary">Login/Register</Button>
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
                                            <Link href="/career" className=' text-[20px]'>Home</Link>
                                        </div>
                                        <div>

                                            <Link href="/career" className='text-[20px]'>Blog</Link>
                                        </div>
                                        <div>

                                            <Link href="/career" className='text-[20px]'>FAQ</Link>
                                        </div>

                                    </div>
                                    <Button onClick={handleOpenModal} className="text-black bg-customSecondary">Login/Register</Button>

                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>


                </div>
            </div >

            <ResponsiveDrawerDialog
                title="Login"
                description="Let's the journey begins!"
                isOpen={open}
                onClose={handleCloseModal}
            >
                <Tabs defaultValue="signin" className="w-[400px] pr-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin" className='bg-customSecondary'>SignIn</TabsTrigger>
                        <TabsTrigger value="signup">SignUp</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin">
                        <SignInForm />
                    </TabsContent>
                    <TabsContent value="signup">
                        <SignUpForm />
                    </TabsContent>

                </Tabs>

            </ResponsiveDrawerDialog>



        </div>

    );
};
export default HomeLayout;
