"use client"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import React, { useEffect, useState } from 'react';
import Image from "next/image"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUserTie } from "react-icons/fa6";
import { PiExam } from "react-icons/pi";
import User from "../../../public/user.png"
import { GiHamburgerMenu } from "react-icons/gi";
import { Home, Package, Package2, PanelLeft, ShoppingCart, Users2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet';
import { useAuthContext } from '@/app/(auth)/context';
import { LuHome } from "react-icons/lu";
import Cookies from 'universal-cookie';


interface IProps {
    children: React.ReactNode;
}
interface MenuItemIProps {
    title: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    suffix: React.ReactNode;
    link: string
}

interface SubMenuIProps {
    title: any
    prefix: any
}

export const SidebarComponent = ({ children }: IProps) => {

    const { currentUser, user, signOut } = useAuthContext();
    const cookies = new Cookies();
    let userCookie = cookies.get("user");

    useEffect(() => {
        if (userCookie && userCookie._id) {
            currentUser(userCookie._id);

        } else {
            console.error("User cookie not found or malformed");
        }
    }, []);

    const [collapsed, setCollapsed] = useState(false);
    const urlPath = usePathname();
    const courseId = urlPath.split('/')[2];

    const CustomMenuItem = ({ title, icon, onClick, suffix, link }:
        MenuItemIProps) => {
        const isActive = urlPath === link;
        return (
            <Link href={link} legacyBehavior >
                <MenuItem icon={icon}
                    className={`py-[-1rem] hover:text-customPrimary ${isActive ? ' bg-white text-customPrimary' : 'text-white'}`} >
                    <span className='text-semibold '>{title}</span>
                    {suffix && <span style={{ marginLeft: 'auto', color: "red", backgroundColor: "red" }}>{suffix}</span>}
                </MenuItem>

            </Link>


        )
    }

    const CustomSubMenuItem = ({ title, prefix }: SubMenuIProps) => {
        return (
            <div style={{ display: 'flex', height: "100" }}>
                <Menu>
                    <SubMenu prefix={prefix} label={title} component="div">
                        <MenuItem> Pie charts</MenuItem>
                        <MenuItem> Line charts</MenuItem>
                        <MenuItem> Bar charts</MenuItem>
                    </SubMenu>
                </Menu>
            </div>
        )

    }



    return (
        <div>
            <div style={{ display: 'flex', height: '100vh', overflow: "hidden" }}>

                <div className='hidden md:flex lg:flex'>
                    <Sidebar
                        collapsed={collapsed}
                        backgroundColor="#003333"
                        transitionDuration={1000}
                        rootStyles={{
                            background:
                                'linear-gradient(180deg, rgba(166,240,255,1) 0%, rgba(220,250,255,1) 49%, rgba(230,252,255,1) 100%)',
                        }}
                    >
                        <div className='flex justify-between align-center p-2 pb-3 bg-customSecondary'>
                            <div className="block justify-center py-5 ">
                                <div className="relative flex justify-center items-center">
                                    <Image src={User} alt="Logo" width={70} height={70} className="rounded-full py-4" />
                                    <span className={`absolute top-[4.2rem] right-12  text-white rounded-full px-2 py-1 text-xs font-bold 
                                    ${user?.profile?.membership === "free" ? "bg-red-500" : "bg-green-500"}`}>{user?.profile?.membership}</span>
                                </div>


                                <h4 className='text-white text-sm py-2'>abdulazeezsodiq403@gmail.com</h4>
                            </div>


                        </div>


                        <Menu>
                            <CustomMenuItem
                                link={"/admin"}
                                title="Dashboard"
                                suffix
                                icon={<LuLayoutDashboard color="primary" />}
                            />
                            <CustomMenuItem
                                link={"/admin/reward"}
                                title="Reward"
                                suffix
                                icon={<PiExam color="primary" />}
                            />

                            <CustomMenuItem
                                link={"/admin/profile"}
                                title="Profile"
                                suffix
                                icon={<FaUserTie color="primary" />}
                            />

                            <CustomMenuItem
                                link={"/"}
                                title="Home"
                                suffix
                                icon={<LuHome color="primary" />}
                            />





                            {/* 
                    <CustomSubMenuItem title="Examination"
                        prefix={<PiExam color="primary" />}
                    /> */}




                        </Menu>


                    </Sidebar>
                </div>


                <div style={{ display: "block", width: "100%", overflow: "auto" }}>
                    <div className="flex justify-between items-center px-4 py-2">
                        <div onClick={() => setCollapsed(!collapsed)} className="hidden md:flex lg:flex" >
                            <GiHamburgerMenu color="block" size={30} />
                        </div>

                        <div>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button size="icon" variant="outline" className="sm:hidden">
                                        <GiHamburgerMenu color="block" size={30} />

                                        <span className="sr-only">Toggle Menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right"

                                    className="sm:max-w-xs bg-customPrimary">


                                    <div className='flex justify-between align-center p-2 pb-3 bg-customSecondary'>
                                        <div className="block justify-center py-5 ">
                                            <div className="relative flex justify-center items-center">
                                                <Image src={User} alt="Logo" width={70} height={70} className="rounded-full py-4" />
                                                <span className={`absolute top-[4.2rem] right-12  text-white rounded-full px-2 py-1 text-xs font-bold 
                                    ${user?.profile?.membership === "free" ? "bg-red-500" : "bg-green-500"}`}>{user?.profile?.membership}</span>
                                            </div>


                                            <h4 className='text-white text-sm py-2'>abdulazeezsodiq403@gmail.com</h4>
                                        </div>


                                    </div>


                                    <Menu>
                                        <CustomMenuItem
                                            link={"/admin"}
                                            title="Dashboard"
                                            suffix
                                            icon={<LuLayoutDashboard color="primary" />}
                                        />
                                        <CustomMenuItem
                                            link={"/admin/reward"}
                                            title="Reward"
                                            suffix
                                            icon={<PiExam color="primary" />}
                                        />

                                        <CustomMenuItem
                                            link={"/admin/profile"}
                                            title="Profile"
                                            suffix
                                            icon={<FaUserTie color="primary" />}
                                        />

                                        <CustomMenuItem
                                            link={"/"}
                                            title="Home"
                                            suffix
                                            icon={<LuHome color="primary" />}
                                        />
                                    </Menu>

                                </SheetContent>
                            </Sheet>
                        </div>

                        <Button onClick={() => signOut()} className="hover:bg-slate-300  bg-customPrimary text-customSecondary">LogOut</Button>
                    </div>

                    <div className="p-5">
                        {children}
                    </div>
                </div>

            </div >

            <div></div>

        </div >
    );
}
