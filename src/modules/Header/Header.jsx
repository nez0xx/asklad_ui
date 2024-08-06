import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react/dist/iconify.js'
import logo from './assets/logo.svg'
import userImg from './assets/user.jpg'
import cls from './Header.module.css'

const Header = () => {
	const user = JSON.parse(localStorage.getItem('user'))
	const token = localStorage.getItem('token')

	return (
		<header className={cls.header}>
			<div className={cls.headerCont}>
				<div className={cls.logo}>
					<img src={logo} alt='logo' />
					<div>А.Склад</div>
				</div>
				<div className={cls.block}>
					<a href='https://t.me/askladsupbot'>
						<Icon
							icon='hugeicons:customer-support'
							width='25px'
							height='25px'
						/>
						Поддержка
					</a>
					{token && (
						<Link to='/profile/account' className={cls.userName}>
							<div className={cls.text}>{user.name}</div>
							<div className={cls.image}>
								<img src={userImg} alt='user' />
							</div>
						</Link>
					)}
				</div>
			</div>
		</header>
	)
}

export default Header
