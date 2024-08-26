import cls from "./About.module.css";
import {Title} from "@/components/title/Title";
import {Subtitle} from "@/components/subtitle/Subtitle";
import example from "@pages/Landing/assets/promo.png";
import React, {FC, RefObject} from "react";

interface AboutInterface {
    refs: RefObject<HTMLDivElement>;
}

export const About: FC<AboutInterface> = (({refs}) => (
    <div className={cls.about} ref={refs}>
        <div className={cls.container}>
            <div className={cls.boxWrapper}>
                <div className={cls.flexWrapper}>
                    <Title width={600}>
                        Система учёта товара для управления образовательным центром
                    </Title>
                </div>
            </div>
            <div className={cls.boxWrapper}>
                <div className={cls.flexWrapper}>
                    <Subtitle width={480}>
                        Подходит руководителям образовательных центров Атоми. Убедитесь,
                        как удобно управлять бизнесом без бумаг и часов ручной работы.
                    </Subtitle>
                </div>
            </div>
            <div className={cls.imageWrapper}>
                <img src={example} alt='example'/>
            </div>
        </div>
    </div>
))

