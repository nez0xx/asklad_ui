import cls from './Advantages.module.css'

export const Advantages = ({refs}) => {
    return (
        <>
            <div className={cls.advantages} ref={refs}>
                <div className={cls.container}>
                    <h1 className={cls.title}>Решение для полного цикла торговли</h1>

                    <div className={cls.gird}>
                        <div className={`${cls.item_1} ${cls.item}`}>
                            <h4 className={cls.subTitle}>Скорость</h4>
                            <span className={cls.description}>
                                        Загрузка информации из excel-файла в один клик. Моментальная
                                    выдача заказа.
                                </span>
                        </div>
                        <div className={`${cls.item_2} ${cls.item}`}>
                            <h4 className={cls.subTitle}>Команда</h4>
                            <span className={cls.description}>
                                    Контролируйте действия сотрудников по приёмке и выдаче товара,
                                    если работаете не в одиночку.
                                </span>
                        </div>
                        <div className={`${cls.item_3} ${cls.item} ${cls.item_white}`}>
                            <h4 className={cls.subTitle}>Финансы</h4>
                            <span className={cls.description}>
                                    Отслеживайте, какой объем финансов и pv проходит через ваш
                                    Центр
                                </span>
                        </div>
                        <div className={`${cls.item_4} ${cls.item}`}>
                            <h4 className={cls.subTitle}>Поддержка</h4>
                            <span className={cls.description}>

                                    Служба поддержки в чате 24/7</span>
                        </div>
                        <div className={`${cls.item_5} ${cls.item} ${cls.item_white}`}>
                            <h4 className={cls.subTitle}>Клиент</h4>
                            <span className={cls.description}>
                                    Автоматические уведомления о доставке заказа клиенту в
                                    Телеграм
                                </span>
                        </div>
                        <div className={`${cls.item_6} ${cls.item} ${cls.item_white}`}>
                            <h4 className={cls.subTitle}>Учёт</h4>
                            <span className={cls.description}>
                                    Программа, адаптированная под специфику бизнеса Атоми</span>
                        </div>
                        <div className={`${cls.item_7} ${cls.item}`}>
                            <h4 className={cls.subTitle}>Выдача</h4>
                            <span className={cls.description}>
                                    Генерация документов для выдачи товаров клиентам экономит
                                    время и бумагу.
                                </span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

