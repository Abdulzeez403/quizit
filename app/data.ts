

interface IHowItWorkProps {
    img?: any,
    title?: string,
    desc?: string
}

// export interface IQuestion {
//     id: number;
//     question: string;
//     answer: string;
//     category: string;
//     examtype: string;
//     examyear: string;
//     hasPassage: number;
//     image: string;
//     option: string[];
//     questionNub: string | null;
//     section: string;
//     solution: string;
// }

export interface IQuestion {
    answer: string;
    examtype: string;
    examyear: string;
    id: number;
    image: string;
    option: { a: string; b: string; c: string; d: string };
    question: string;
    section: string;
    solution: string;
}

interface Profile {
    points: number;
    membership: string;
    badges: string[];
}

interface Performance {
    subject: string;
    score: number;
    points: number;
    createdAt: Date;
}

interface Reward {
    points: number;
    type: string;
    amount: string;
    createdAt: Date;
}

export interface IUser {
    name: string;
    gender: string;
    username: string;
    email: string;
    password: string;
    phone?: string;
    profile: Profile;
    performance: Performance[];
    reward: Reward[];
}



export const howitworkData: IHowItWorkProps[] = [
    {
        img: "/select.png",
        title: "Select the Subject",
        desc: "you are to select the subject, time and number of question you ewant to answer"
    },
    {
        img: "/passed.png",
        title: "Pass the quiz",
        desc: "you are to select the subject, time and number of question you ewant to answer"
    },
    {
        img: "/coin.png",
        title: "Earn a Coins",
        desc: "you are to select the subject, time and number of question you ewant to answer"
    }
]

// data.ts
export const tableData = [
    {
        name: "Noah Williams",
        email: "noah@example.com",
        type: "Subscription",
        status: "Fulfilled",
        date: "2023-06-25",
        amount: "$350.00",
    },
    {
        name: "Emma Brown",
        email: "emma@example.com",
        type: "Sale",
        status: "Fulfilled",
        date: "2023-06-26",
        amount: "$450.00",
    },
    {
        name: "Liam Johnson",
        email: "liam@example.com",
        type: "Sale",
        status: "Fulfilled",
        date: "2023-06-23",
        amount: "$250.00",
    },
    {
        name: "Olivia Smith",
        email: "olivia@example.com",
        type: "Refund",
        status: "Declined",
        date: "2023-06-24",
        amount: "$150.00",
    },
    // Add more data as needed
];


