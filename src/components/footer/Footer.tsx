import cls from "./Footer.module.css";
import telegram from "@pages/Landing/assets/telegram.svg";
import React, {useCallback} from "react";
import pdf from "@pages/Landing/Публичная_оферта.pdf";


export const Footer = () => {
    const openPdf = useCallback((e) => {
        e.preventDefault()
        window.open(pdf, '_blank')
    }, [window])
    return (
        <>
            <footer className={cls.footer}>
                <div className={cls.container}>
                    <div>
                        <h4>
                            А.<span>Склад</span>
                        </h4>
                        <p>Чугайнов Иван Дмитриевич</p>
                        <p>ИНН 590317755509</p>
                        <p>E-mail: askladrf@gmail.com</p>
                        <p style={{cursor: 'pointer'}} onClick={openPdf}>
                            Публичная оферта
                        </p>
                    </div>

                    <div className={cls.feedback}>
                        <div>Есть вопрос? Напишите в поддержку</div>
                        <a
                            href='https://t.me/askladsupbot'
                            target='_blank'
                            rel='noopener noreferrer'
                            className={cls.telegram}
                        >
                            <div className={cls.image}>
                                <img src={telegram} alt='telegram logo'/>
                            </div>
                            <div>Telegram</div>
                        </a>
                        <a>© 2024, А.Склад. Все права защищены</a>
                    </div>
                    <div></div>
                </div>
            </footer>
        </>
    );
};

