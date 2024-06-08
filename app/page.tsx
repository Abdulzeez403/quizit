
"use client"
import HomePage from "../app/home/detail"
import HomeLayout from "./homeLayout";
import { useState } from "react";




export default function Home() {
    const [open, setOpen] = useState(false);

    const handleCloseModal = () => {
        setOpen(false)
    }

    const handleOpenModal = () => {
        setOpen(true)
    }
    return (



        <main className="">
            <HomeLayout
                handleCloseModal={handleCloseModal}
                handleOpenModal={handleOpenModal}
                open={open} />
            <HomePage handleOpenModal={handleOpenModal} />
        </main>
    );
}
