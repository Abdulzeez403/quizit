import React from 'react'

interface IHeaderProp {
    className?: string,
    title: any
}

interface ITextProp {
    className?: string,
    title: any
}

export const HeaderText = ({ className, title }: IHeaderProp) => {
    return (
        <div>
            <h1 className={`${className} text-center  text-[2rem] font-bold  md:text-[2.3rem] lg:text-[2.3rem]`}>{title}</h1>
        </div>
    )
}



export const Text = ({ className, title }: ITextProp) => {
    return (
        <div>
            <h1 className={`${className} text-center text-sm`}>{title}</h1>
        </div>
    )
}
