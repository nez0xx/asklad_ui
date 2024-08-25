import {PricesInterface} from "@/interfaces/Prices/Prices.interface";

export const CategoriesPricesOptions: Array<PricesInterface> = [
    {id: 1, title: 'Free', price: 0, interval: 0 ,text: 'Месяц бесплатно'},
    {id: 2, title: 'Start', price: 999, interval: 30 ,text: '1 месяц'},
    {id: 3, title: 'Medium', price: 899, interval: 90 ,text: '3 месяца'},
    {id: 4, title: 'Large', price: 749, interval: 182 ,text: '6 месяцев'},
    {id: 5, title: 'Pro', price: 649, interval: 365 ,text: '12 месяцев'},
]