import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./(auth)/context";
import Notification from "./components/toast";
import { BuyAirtimeProvider } from "./(admin)/admin/reward/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "MinuLink",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <BuyAirtimeProvider>
                        <Notification />
                        {children}
                    </BuyAirtimeProvider>

                </AuthProvider>

            </body>
        </html>
    );
}
