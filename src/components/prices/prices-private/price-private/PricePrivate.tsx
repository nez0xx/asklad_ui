import {Grid2} from "@mui/material";
import cls from './PricePrivate.module.css'
import Button from "@UI/Button/Button";

export const PricePrivate = ({title, text, price}: { title: string, text: string, price: number }) => {
    return (
        <Grid2 py={2} pr={22}>
            <div className={cls.box}>
                <div className={cls.flex}>
                    <div className={cls.item}>{title}</div>
                    <div className={cls.item}>{price}₽/мес.</div>
                    <div className={cls.item}>{text}</div>
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

