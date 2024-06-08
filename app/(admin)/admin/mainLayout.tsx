"use client"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import React, { useState } from 'react';
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

    const [toggle, setToggle] = useState(false);
    const urlPath = usePathname();
    const courseId = urlPath.split('/')[2];

    const CustomMenuItem = ({ title, icon, onClick, suffix, link }:
        MenuItemIProps) => {
        const isActive = urlPath === link;
        return (
            <Link href={link} legacyBehavior >
                <MenuItem icon={icon}
                    className={`py-[-1rem] ${isActive ? ' bg-white text-blue-400' : 'text-white'}`} >
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
                <Sidebar
                    toggled={toggle}
                    backgroundColor="black"
                    transitionDuration={1000}
                    breakPoint="always"
                    onBackdropClick={() => setToggle(false)}
                    rootStyles={{
                        background:
                            'linear-gradient(180deg, rgba(166,240,255,1) 0%, rgba(220,250,255,1) 49%, rgba(230,252,255,1) 100%)',
                    }}
                >
                    <div className='flex justify-between align-center p-2 pb-3 bg-slate-800'>
                        <div className="block justify-center py-5 ">
                            <div className="relative flex justify-center items-center">
                                <Image src={User} alt="Logo" width={70} height={70} className="rounded-full py-4" />
                                <span className="absolute top-[4.2rem] right-12 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">free</span>
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





                        {/* 
                    <CustomSubMenuItem title="Examination"
                        prefix={<PiExam color="primary" />}
                    /> */}




                    </Menu>


                </Sidebar>

                <div style={{ display: "block", width: "100%", overflow: "auto" }}>
                    <div className="flex justify-between items-center px-4 py-2">
                        <div onClick={() => setToggle(!toggle)} >
                            <GiHamburgerMenu color="block" size={30} />
                        </div>

                        <div>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button size="icon" variant="outline" className="sm:hidden">
                                        <PanelLeft className="h-5 w-5" />
                                        <span className="sr-only">Toggle Menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="sm:max-w-xs">
                                    <nav className="grid gap-6 text-lg font-medium">
                                        <Link
                                            href="#"
                                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                        >
                                            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                            <span className="sr-only">Acme Inc</span>
                                        </Link>
                                        <Link
                                            href="#"
                                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                        >
                                            <Home className="h-5 w-5" />
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="#"
                                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                        >
                                            <ShoppingCart className="h-5 w-5" />
                                            Orders
                                        </Link>
                                        <Link
                                            href="#"
                                            className="flex items-center gap-4 px-2.5 text-foreground"
                                        >
                                            <Package className="h-5 w-5" />
                                            Products
                                        </Link>
                                        <Link
                                            href="#"
                                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                        >
                                            <Users2 className="h-5 w-5" />
                                            Customers
                                        </Link>

                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    <div className="p-5">
                        {children}
                    </div>
                </div>

            </div>

            <div></div>

        </div>
    );
}
