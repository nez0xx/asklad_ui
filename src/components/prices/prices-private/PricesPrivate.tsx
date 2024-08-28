import cls from './PricesPrivate.module.css'
import {CategoriesPricesOptions} from "@/mocks/PriceList.options";
import {Grid2} from "@mui/material";
import {PricePrivate} from "@/components/prices/prices-private/price-private/PricePrivate";

export const PricesPrivate = () => {
    return (
        <section className={cls.section}>
            <h1 className={cls.title}>Тарифы</h1>


                {CategoriesPricesOptions.map(({id, price, title, text}) =>
                    <PricePrivate key={String(id)} title={title} text={text} price={price}/>
                )}

        </section>
    );
};

