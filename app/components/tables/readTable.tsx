// TableRowComponent.tsx
import { TableCell, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';

interface TableRowProps {
    subject: string
    score: number
    option: number

}

const TableRowComponent: React.FC<TableRowProps> = ({ subject, score, option }) => {
    return (
        <div>

            <TableRow>
                <TableCell>
                    <div className="font-medium">{subject}</div>
                </TableCell>
                <TableCell className=" ">{score}</TableCell>
                <TableCell className="">{option}</TableCell>
            </TableRow>
        </div>

    );
};

export default TableRowComponent;
