import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
// import { DollarSign } from 'react-icons/fa';

interface RevenueCardProps {
    title: string;
    amount: string;
    change: string;
    icon?: any
}

const CardComponent: React.FC<RevenueCardProps> = ({ title, amount, change, icon }) => {
    return (
        <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{amount}</div>
                <p className="text-xs text-muted-foreground">
                    {change}
                </p>
            </CardContent>
        </Card>
    );
};

export default CardComponent;
