import React, {useState, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {useIntersection} from 'react-use'
import Button from '@UI/Button/Button'
import logo from './assets/logo.png'
import example from './assets/example.png'
import excel from './assets/excel.png'
import telegram from './assets/telegram.svg'
import pdf from './Публичная_оферта.pdf'
import cls from './Landing.module.css'

const Landing = () => {
    const navigate = useNavigate()

    const aboutRef = useRef(null)
    const advantagesRef = useRef(null)
    const feesRef = useRef(null)

    const [activeSection, setActiveSection] = useState('about')

    const handleScrollTo = (ref) => {
        ref.current.scrollIntoView({behavior: 'smooth'})
    }

    const aboutIntersection = useIntersection(aboutRef, {
        threshold: 0.4,
    })
    const advantagesIntersection = useIntersection(advantagesRef, {
        threshold: 0.4,
    })
    const feesIntersection = useIntersection(feesRef, {
        threshold: 0.4,
    })

    React.useEffect(() => {
        if (aboutIntersection?.isIntersecting) {
            setActiveSection('about')
        } else if (advantagesIntersection?.isIntersecting) {
            setActiveSection('advantages')
        } else if (feesIntersection?.isIntersecting) {
            setActiveSection('fees')
        }
    }, [
        aboutIntersection?.isIntersecting,
        advantagesIntersection?.isIntersecting,
        feesIntersection?.isIntersecting,
    ])

    const openPdf = (e) => {
        e.preventDefault()
        window.open(pdf, '_blank')
    }

    const [menuOpen, setMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className={cls.wrapper}>
            <header className={cls.header}>
                <div className={cls.container}>
                    <div className={cls.logo}>
                        <img src={logo} alt='logo'/>
                        <div>А.Склад</div>
                    </div>

                    {/* Navigation Links */}
                    <nav className={`${cls.nav} ${menuOpen ? cls.navOpen : ''}`}>
                        <a
                            href='@pages/Landing/Landing#link1'
                            className={`${cls.navLink} ${
                                activeSection === 'about' ? cls.active : ''
                            }`}
                            onClick={(e) => {
                                e.preventDefault()
                                handleScrollTo(aboutRef)
                                setMenuOpen(false) // Close menu after click
                            }}
                        >
                            О продукте
                        </a>
                        <a
                            href='@pages/Landing/Landing#link2'
                            className={`${cls.navLink} ${
                                activeSection === 'advantages' ? cls.active : ''
                            }`}
                            onClick={(e) => {
                                e.preventDefault()
                                handleScrollTo(advantagesRef)
                                setMenuOpen(false) // Close menu after click
                            }}
                        >
                            Преимущества
                        </a>
                        <a
                            href='@pages/Landing/Landing#link3'
                            className={`${cls.navLink} ${
                                activeSection === 'fees' ? cls.active : ''
                            }`}
                            onClick={(e) => {
                                e.preventDefault()
                                handleScrollTo(feesRef)
                                setMenuOpen(false) // Close menu after click
                            }}
                        >
                            Тарифы
                        </a>
                        <a
                            onClick={(e) => {
                                e.preventDefault()
                                navigate('/login')
                                setMenuOpen(false) // Close menu after click
                            }}
                            className={cls.navLink}
                        >
                            Войти
                        </a>
                    </nav>

                    <Button
                        onClick={() => navigate('/register')}
                        styles={{padding: '16px 30px'}}
                    >
                        Попробовать
                    </Button>
                    {isMobile && (
                        <div
                            className={`${cls.hamburger} ${
                                menuOpen ? cls.hamburgerOpen : ''
                            }`}
                            onClick={toggleMenu}
                        >
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    )}
                </div>
            </header>

            <main>
                <div className={cls.about} ref={aboutRef}>
                    <div className={cls.container}>
                        <h1 className={cls.title}>
                            Система учёта товара для управления образовательным центром{' '}
                        </h1>
                        <p>
                            Подходит руководителям образовательных центров Атоми. Убедитесь,
                            как удобно управлять бизнесом без бумаг и часов ручной работы.{' '}
                        </p>
                        <img src={example} alt='example'/>
                    </div>
                </div>

                <div className={cls.advantages} ref={advantagesRef}>
                    <div className={cls.container}>
                        <h1 className={cls.title}>Решение для полного цикла торговли</h1>

                        <div className={cls.gird}>
                            <div className={`${cls.item_1} ${cls.item}`}>
                                <h4>Скорость</h4>
                                <p>
                                    Загрузка информации из excel-файла в один клик. Моментальная
                                    выдача заказа.
                                </p>
                                <img src={excel} alt='excel'/>
                            </div>
                            <div className={`${cls.item_2} ${cls.item}`}>
                                <h4>Команда</h4>
                                <p>
                                    Контролируйте действия сотрудников по приёмке и выдаче товара,
                                    если работаете не в одиночку.
                                </p>
                            </div>
                            <div className={`${cls.item_3} ${cls.item} ${cls.item_white}`}>
                                <h4>Финансы</h4>
                                <p>
                                    Отслеживайте, какой объем финансов и pv проходит через ваш
                                    Центр
                                </p>
                            </div>
                            <div className={`${cls.item_4} ${cls.item}`}>
                                <h4>Поддержка</h4>
                                <p>Служба поддержки в чате 24/7</p>
                            </div>
                            <div className={`${cls.item_5} ${cls.item} ${cls.item_white}`}>
                                <h4>Клиент</h4>
                                <p>
                                    Автоматические уведомления о доставке заказа клиенту в
                                    Телеграм
                                </p>
                            </div>
                            <div className={`${cls.item_6} ${cls.item} ${cls.item_white}`}>
                                <h4>Учёт</h4>
                                <p>Программа, адаптированная под специфику бизнеса Атоми</p>
                            </div>
                            <div className={`${cls.item_7} ${cls.item}`}>
                                <h4>Выдача</h4>
                                <p>
                                    Генерация документов для выдачи товаров клиентам экономит
                                    время и бумагу.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cls.fees} ref={feesRef}>
                    <div className={cls.container}>
                        <h1 className={cls.fees_title}>Тарифы</h1>
                        <p className={cls.fees_p}>
                            Приобретите подписку и получите доступ ко всем возможностям
                            сервиса
                        </p>

                        <div className={cls.fees_container}>
                            <div className={cls.fees_item}>
                                <h4>Free</h4>
                                <p>Месяц бесплатно</p>
                                <div>0₽/мес.</div>
                                <Button
                                    styles={{backgroundColor: '#0085ff', padding: '15px 23px'}}
                                >
                                    Выбрать
                                </Button>
                            </div>
                            <div className={cls.fees_item}>
                                <h4>Start</h4>
                                <p>1 месяц</p>
                                <div>999₽/мес.</div>
                                <Button
                                    styles={{backgroundColor: '#0085ff', padding: '15px 23px'}}
                                >
                                    Выбрать
                                </Button>
                            </div>
                            <div className={cls.fees_item}>
                                <h4>Medium</h4>
                                <p>3 месяца</p>
                                <div>899₽/мес.</div>
                                <Button
                                    styles={{backgroundColor: '#0085ff', padding: '15px 23px'}}
                                >
                                    Выбрать
                                </Button>
                            </div>
                            <div className={cls.fees_item}>
                                <h4>Large</h4>
                                <p>6 месяцев</p>
                                <div>749₽/мес.</div>
                                <Button
                                    styles={{backgroundColor: '#0085ff', padding: '15px 23px'}}
                                >
                                    Выбрать
                                </Button>
                            </div>
                            <div className={cls.fees_item}>
                                <h4>Pro</h4>
                                <p>12 месяцев</p>
                                <div>649₽/мес.</div>
                                <Button
                                    styles={{backgroundColor: '#0085ff', padding: '15px 23px'}}
                                >
                                    Выбрать
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

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
                </div>
            </footer>
        </div>
    )
}

export default Landing
