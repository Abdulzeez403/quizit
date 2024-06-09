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
            <TableCell className="">{points}</TableCell>

            <TableCell className="">{amount}</TableCell>
        </TableRow>
    );
};

export default RewardTable;
