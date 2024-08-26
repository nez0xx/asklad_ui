import React from "react";
import cls from './Title.module.css'
interface TitleInterface {
    children: React.ReactNode | string
}

export const Title = ({children,width}: { children: TitleInterface,width: number }) => {
    return (
        <h1 className={cls.title} style={{width: `${width}px`}}>
            {children}
        </h1>
    );
};

