import Image from "next/image";
import HomePage from "../app/home/detail"
import HomeLayout from "./homeLayout";

export default function Home() {
    return (

        <main className="">
            <HomeLayout />
            <HomePage />
        </main>
    );
}
