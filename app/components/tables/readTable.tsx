// TableRowComponent.tsx
import { TableCell, TableRow } from '@/components/ui/table';
import React from 'react';

interface TableRowProps {
    name: string;
    email: string;
    type: string;
    status: string;
    date: string;
    amount: string;
}

const TableRowComponent: React.FC<TableRowProps> = ({ name, email, type, status, date, amount }) => {
    return (
        <TableRow>
            <TableCell>
                <div className="font-medium">{name}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">{email}</div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">{type}</TableCell>
            <TableCell className="hidden sm:table-cell">
                {/* <Badge className="text-xs" variant={status === "Declined" ? "outline" : "secondary"}>
                    {status}
                </Badge> */}
            </TableCell>
            <TableCell className="hidden md:table-cell">{date}</TableCell>
            <TableCell className="text-right">{amount}</TableCell>
        </TableRow>
    );
};

export default TableRowComponent;
