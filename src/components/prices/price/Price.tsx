import cls from "../Prices.module.css";
import Button from "@UI/Button/Button";
import {PricesInterface} from "@/interfaces/Prices/Prices.interface";


export const Price = ({ title, text, price}: PricesInterface) => {
    return (

      <div className={cls.fees_item}>
          <h4 className={cls.titlePrice}>{title}</h4>
          <p className={cls.subTitlePrice}> {text}</p>
          <div>{price}₽/мес.</div>
          <Button
              styles={{backgroundColor: '#0085ff', padding: '15px 23px'}}
          >
              Выбрать
          </Button>
  </div>
    );
};

