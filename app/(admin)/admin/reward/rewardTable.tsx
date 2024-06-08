// TableRowComponent.tsx
import { TableCell, TableRow } from '@/components/ui/table';
import React from 'react';

interface TableRowProps {
    points: number
    amount: string
    type: string

}

const RewardTable: React.FC<TableRowProps> = ({ points, amount, type }) => {
    return (
        <TableRow>
            <TableCell>
                <div className="font-medium">{type}</div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">{points}</TableCell>
            <TableCell className="hidden sm:table-cell">
            </TableCell>
            <TableCell className="hidden md:table-cell">{amount}</TableCell>
        </TableRow>
    );
};

export default RewardTable;
