"use client"
import React from 'react'
import { IoIosSearch } from "react-icons/io";
import CardComponent from '../../components/card';
import { Table, TableBody } from '@/components/ui/table';
import { tableData } from '@/app/data';
import TableRowComponent from '@/app/components/tables/readTable';
import { CiCoinInsert } from "react-icons/ci";
import Barchart from '@/app/components/charts/bar';
const DashboardView = () => {
    return (
        <div>
            <div className='flex  justify-between border-b-2 shadow-md py-2 px-2'>

                icon={<IoIosSearch />}
                <button>LogOut</button>

            </div>

            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 pt-5">
                <CardComponent
                    title="Total Coin"
                    amount="$45,231.89"
                    change="+20.1% from last month"
                    icon={<CiCoinInsert color="yellow" size={30} />}
                />
                <CardComponent
                    title="Total Transcations"
                    amount="1,230"
                    change="+5.2% from last month"
                />

                <CardComponent
                    title="Converted Coin"
                    amount="1,230"
                    change="+5.2% from last month"
                />

                <CardComponent
                    title="Pending Cion"
                    amount="1,230"
                    change="+5.2% from last month"
                />
                {/* Other components */}

            </div>
            <div>
                <Barchart />
            </div>



            <div className='border-2 rounded-lg my-4'>
                <div className='py-6 px-4 w-80'>
                    <h3 className="text-lg font-semibold">Transaction</h3>
                    <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum eius saepe aut</p>
                </div>
                <Table className='border-2'>
                    <TableBody >
                        {tableData.map((row, index) => (
                            <TableRowComponent
                                key={index}
                                name={row.name}
                                email={row.email}
                                type={row.type}
                                status={row.status}
                                date={row.date}
                                amount={row.amount}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div >


    )
}

export default DashboardView;
