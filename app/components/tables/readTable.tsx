// TableRowComponent.tsx
import { TableCell, TableRow } from '@/components/ui/table';
import React from 'react';

interface TableRowProps {
    subject: string
    score: number
    option: number

}

const TableRowComponent: React.FC<TableRowProps> = ({ subject, score, option }) => {
    return (
        <TableRow>
            <TableCell>
                <div className="font-medium">{subject}</div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">{score}</TableCell>
            <TableCell className="hidden sm:table-cell">
            </TableCell>
            <TableCell className="hidden md:table-cell">{option}</TableCell>
            {/* <TableCell className="text-right">{amount}</TableCell> */}
        </TableRow>
    );
};

export default TableRowComponent;
