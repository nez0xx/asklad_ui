import React from "react";
import cls from './Subtitle.module.css'

interface SubtitleInterface {
    children: React.ReactNode | string
    width: number
}

export const Subtitle = ({children, width}: { children: SubtitleInterface,width: number }) => {
    return (
        <span className={cls.subTitle} style={{width: `${width}px`}}>
            {children}
        </span>
    );
};

