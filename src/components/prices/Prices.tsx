import cls from "./Prices.module.css";
import {FC, RefObject} from "react";
import {Price} from "@/components/prices/price/Price";
import {CategoriesPricesOptions} from "@/mocks/PriceList.options";
import {Title} from "@/components/title/Title";
import {Subtitle} from "@/components/subtitle/Subtitle";

interface PricesPropsInterface {
    refs: RefObject<HTMLDivElement>;
}

export const Prices: FC<PricesPropsInterface> = (({refs}) => (
    <div className={cls.fees} ref={refs}>
        <div className={cls.container}>
            <div className={cls.flexWrapper}>
            <Title width={600}>Тарифы</Title>
            </div>
           <div className={cls.flexWrapper}>
               <Subtitle width={420}>
                   Приобретите подписку и получите доступ ко всем возможностям
                   сервиса
               </Subtitle>
           </div>
            <div className={cls.wrapper}>
                {CategoriesPricesOptions.map(({id, price, title, text}) =>
                    <Price key={String(id)} title={title} text={text} price={price}/>
                )}
            </div>
        </div>
    </div>
))





