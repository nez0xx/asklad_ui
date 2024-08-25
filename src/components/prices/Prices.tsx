import cls from "./Prices.module.css";
import {forwardRef} from "react";
import {Price} from "@/components/prices/price/Price";
import {CategoriesPricesOptions} from "@/mocks/PriceList.options";

export const Prices = forwardRef<HTMLDivElement, any>((props) => (
    <div className={cls.fees} ref={props.refs}>
        <div className={cls.container}>
            <h1 className={cls.title}>Тарифы</h1>
            <p className={cls.fees_p}>
                Приобретите подписку и получите доступ ко всем возможностям
                сервиса
            </p>
            <div className={cls.wrapper}>
                {CategoriesPricesOptions.map(({id, price, title, text}) =>
                    <Price key={String(id)} title={title} text={text} price={price}/>
                )}
            </div>
        </div>
    </div>
))





