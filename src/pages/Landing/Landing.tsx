import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useIntersection} from 'react-use'
import Button from '@UI/Button/Button'
import logo from './assets/logo.png'
import cls from './Landing.module.css'
import {Prices} from "@/components/prices/Prices";
import {Advantages} from "@/components/advantages/Advantages";
import {Footer} from "@/components/footer/Footer";
import {About} from "@/components/about/About";

const Landing = () => {
    const navigate = useNavigate()

    const aboutRef = useRef<HTMLDivElement>(null)
    const advantagesRef = useRef<HTMLDivElement>(null)
    const feesRef = useRef<HTMLDivElement>(null)

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
                        styles={{padding: '8px 16px', fontSize: '18px'}}
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
                <About refs={aboutRef}/>
                <Advantages refs={advantagesRef}/>
                <Prices refs={feesRef}/>
            </main>
            <Footer/>
        </div>
    )
}

export default Landing
