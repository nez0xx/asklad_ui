import {Grid2} from "@mui/material";
import cls from './PricePrivate.module.css'
import Button from "@UI/Button/Button";

export const PricePrivate = ({title, text, price}: { title: string, text: string, price: number }) => {
    return (
        <Grid2 py={2} pr={22}>
            <div className={cls.box}>
                <div className={cls.flex}>
                    <div className={cls.item}><span className={cls.item_title}>{title}</span></div>
                    <div className={cls.item}><span className={cls.item_price}>{price}₽/мес.</span></div>
                    <div className={cls.item}>
                        <span className={cls.item_text}>{text}</span>
                    </div>

                    <div className={cls.item}>
                        <Button
                            styles={{backgroundColor: '#0085ff', padding: '15px 23px'}}
                        >
                            Выбрать
                        </Button>
                    </div>
                </div>
            </div>
        </Grid2>
    );
};

