// TableRowComponent.tsx
import { TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';

interface TableRowProps {
    subject: string
    score: number
    points: number
    // date: any

}

const TableRowComponent: React.FC<TableRowProps> = ({ subject, score, points }) => {
    return (


        <TableRow>
            <TableCell>
                <div className="font-medium">{subject}</div>
            </TableCell>
            <TableCell className=" ">{score} </TableCell>
            <TableCell className="">{points}</TableCell>
            {/* <TableCell className="">{points}</TableCell> */}
        </TableRow>

    );
};

export default TableRowComponent;
