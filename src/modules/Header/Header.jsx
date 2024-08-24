import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react/dist/iconify.js'
import logo from './assets/logo.svg'
import userImg from './assets/user.jpg'
import cls from './Header.module.css'
import HamburgerIcon from '../../UI/HamburgerIcon/HamburgerIcon'
import { useAuth } from '../../context/userContext'

const Header = () => {
	const { user, isAuth } = useAuth()

	return (
		<header className={cls.header}>
			<div className={cls.headerCont}>
				<Link to='/profile/orders' className={cls.logo}>
					<img src={logo} alt='logo' />
					<div>А.Склад</div>
				</Link>
				<div className={cls.block}>
					<a className={cls.support} href='https://t.me/askladsupbot'>
						<Icon
							icon='hugeicons:customer-support'
							width='25px'
							height='25px'
						/>
						<div className={cls.block_text}>Поддержка</div>
					</a>
					{isAuth && (
						<Link to='/profile/account' className={cls.userName}>
							<div className={`${cls.text} ${cls.block_text}`}>{user.name}</div>
							<div className={cls.image}>
								<img src={userImg} alt='user' />
							</div>
						</Link>
					)}
				</div>
				{isAuth && <HamburgerIcon />}
			</div>
		</header>
	)
}

export default Header
