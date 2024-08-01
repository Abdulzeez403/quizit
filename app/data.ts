

interface IHowItWorkProps {
    img?: any,
    title?: string,
    desc?: string
}

export interface IAirtime {
    amount: number;
    phone: number;
    network: string;

}

export interface IData {
    phone: number;
    network?: string;
    dataPlan?: string

}



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

export interface IQuestions {
    data: IQuestion[];
    status: number;
    subject: string;
    total: number;
}

interface Profile {
    points: number;
    membership: string;
    badges: string[];
    rewardCount: number,
    withdrawReward: number
}

export interface IPerformance {
    subject: string;
    score: number;
    points: number;
}

export interface IReward {
    points: number;
    type: string;
    amount: string;
    createdAt: Date;
}

export interface IUser {
    name?: string;
    gender?: string;
    username?: string;
    email?: string;
    password?: string;
    phone?: string;
    profile?: Profile;
    performance?: Performance[];
    reward?: IReward[];
}

export const NetworkProviders = [
    {
        value: "mtn",
        img: "/mtn.png",
    },
    {
        value: "airtel",
        img: "/airtel.png",
    },
    {
        value: "glo",
        img: "/glo.jpg",
    },
    {
        value: "9mobile",
        img: "/9mobile.jpeg",
    },
];



export const howitworkData: IHowItWorkProps[] = [
    {
        img: "/select.png",
        title: "Select the Subject",
        desc: "Choose Your Focus By Selecting the Perfect Subject and Year"
    },
    {
        img: "/passed.png",
        title: "Pass the quiz",
        desc: "Pass The Quiz With Flying Color and Proceed To Reward"
    },
    {
        img: "/coins-stack.png",
        title: "Earn a Coins",
        desc: "Earn Coin And Swap it With Either Airtime or Data and more"
    }
]

// data.ts



